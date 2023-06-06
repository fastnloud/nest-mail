import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mailConfig from './configs/mail.config';
import { ConfigurableModuleClass } from './mail.module-definition';
import { SmtpTransporter } from './transporters/smtp.transporter';

@Module({
  imports: [ConfigModule.forFeature(mailConfig)],
  providers: [SmtpTransporter],
  exports: [SmtpTransporter],
})
export class MailModule extends ConfigurableModuleClass {
  static forRoot(options = {}): DynamicModule {
    return super.forRoot(options);
  }

  static forRootAsync(options = {}): DynamicModule {
    return super.forRootAsync(options);
  }
}
