import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mailConfig from './configs/mail.config';
import { SmtpTransporter } from './transporters/smtp.transporter';

@Module({
  imports: [ConfigModule.forFeature(mailConfig)],
  providers: [SmtpTransporter],
  exports: [SmtpTransporter],
})
export class MailModule {}
