import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './infra/env.schema';
import { EnvService } from './infra/env.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validate: (env) => envSchema.parse(env),
      isGlobal: false,
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
