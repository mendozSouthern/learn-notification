import { z } from 'zod';
import { Environment } from '../domain/models/environment';

export const envSchema = z.object({
  NODE_ENV: z.nativeEnum(Environment).default(Environment.Development),
  PORT: z.coerce.number(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_URL: z.string().url(),

  TWILIO_ACCOUNT_SID: z.string(),
  TWILIO_AUTH_TOKEN: z.string(),
  TWILIO_PHONE_NUMBER: z.string(),

  RABBITMQ_USER: z.string(),
  RABBITMQ_PASSWORD: z.string(),
  RABBITMQ_HOST: z.string(),
});

export type Env = z.infer<typeof envSchema>;
