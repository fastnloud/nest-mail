import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SentMessageInfo, createTransport } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/smtp-transport';
import mailConfig from '../configs/mail.config';

@Injectable()
export class SmtpTransporter {
  constructor(
    @Inject(mailConfig.KEY)
    private readonly config: ConfigType<typeof mailConfig>,
  ) {}

  send(
    options: MailOptions,
    cb: (error: Error | null, info: SentMessageInfo) => void,
  ): void {
    if (this.config.url === 'smtp://null') {
      return;
    }

    if (!options.from) {
      options = {
        ...options,
        from: {
          address: this.config.defaultFromAddress,
          name: this.config.defaultFromName,
        },
      };
    }

    if (this.config.recipients) {
      options = {
        ...options,
        bcc: this.config.recipients,
        to: undefined,
        cc: undefined,
      };
    }

    const transport = createTransport({ url: this.config.url });

    transport.sendMail(options, cb);
  }
}
