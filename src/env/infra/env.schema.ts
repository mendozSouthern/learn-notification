import { z } from 'zod';
import { Environment } from '../domain/models/environment';

export const envSchema = z.object({
  NODE_ENV: z.nativeEnum(Environment),
  PORT: z.coerce.number(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;
