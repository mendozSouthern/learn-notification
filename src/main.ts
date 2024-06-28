import { AppModule } from '@/app.module';
import { EnvService } from '@/env/infra/env.service';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      enableCircularCheck: true,
      excludePrefixes: ['_'],
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const configService = app.get(EnvService);
  const port = configService.get('PORT');
  await app.listen(port, '0.0.0.0');
}
bootstrap();
