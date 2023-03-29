## Description

Mail module for Nest that uses Nodemailer to deliver messages.

## Installation

```bash
$ npm i --save @fastnloud/nest-mail
```

## Setup

Import module:

```ts
import { MailModule } from '@fastnloud/nest-mail';
import { Module } from '@nestjs/common';

@Module({
  imports: [MailModule],
})
export class AppModule {}
```

A sample `.env` file looks something like this:

```
MAIL_DEFAULT_FROM_ADDRESS=john.doe@example.com
MAIL_DEFAULT_FROM_NAME=John Doe
MAIL_RECIPIENTS=
MAIL_URL=smtp://localhost:1025
```

## Usage

```ts
import { SmtpTransporter } from '@fastnloud/nest-mail';
import { Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly smtpTransporter: SmtpTransporter) {}

  async send(): Promise<void> {
    this.smtpTransporter.send(
      {
        to: 'jane.doe@example.com',
        subject: `hello`,
        text: 'world',
      },
      (error: Error | null, info: SentMessageInfo) => {
        if (error) {
          throw error;
        }

        console.log(info);
      },
    );
  }
}
```

## License

nest-mail is [MIT licensed](LICENSE).
