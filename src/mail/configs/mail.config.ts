import { registerAs } from '@nestjs/config';
import Joi from 'joi';
import * as process from 'process';

export default registerAs('mail', () => {
  const config = {
    defaultFromAddress: process.env.MAIL_DEFAULT_FROM_ADDRESS,
    defaultFromName: process.env.MAIL_DEFAULT_FROM_NAME,
    recipients: process.env.MAIL_RECIPIENTS,
    url: process.env.MAIL_URL,
  };

  const validationResult = Joi.object({
    defaultFromAddress: Joi.string().required(),
    defaultFromName: Joi.string().required(),
    recipients: Joi.string().optional().allow(''),
    url: Joi.string().required(),
  }).validate(config, { abortEarly: false });

  if (validationResult.error) {
    throw validationResult.error;
  }

  return config;
});
