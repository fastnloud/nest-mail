import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import * as process from 'process';

export default registerAs('mail', () => {
  const config = {
    defaultFromAddress: process.env.MAIL_DEFAULT_FROM_ADDRESS,
    defaultFromName: process.env.MAIL_DEFAULT_FROM_NAME,
    recipients: process.env.MAIL_RECIPIENTS,
    url: process.env.MAIL_URL,
  };

  const validationResult = Joi.object({
    defaultFromAddress: Joi.string().required().messages({
      '*': 'Environment varable MAIL_DEFAULT_FROM_ADDRESS is required (string; e.g. j.doe@example.com)',
    }),
    defaultFromName: Joi.string().required().messages({
      '*': 'Environment varable MAIL_DEFAULT_FROM_NAME is required (string; e.g. John Doe)',
    }),
    recipients: Joi.string().optional().allow(''),
    url: Joi.string().required().messages({
      '*': 'Environment varable MAIL_URL is required (string; e.g. smtp://localhost:1025)',
    }),
  }).validate(config, {
    abortEarly: false,
  });

  if (validationResult.error) {
    throw validationResult.error;
  }

  return config;
});
