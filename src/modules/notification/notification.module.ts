import { EnvModule } from '@/env/env.module';
import { EnvService } from '@/env/infra/env.service';
import { DatabaseModule } from '@/persistence/database/database.module';
import { TwilioModule } from '@/providers/twilio/twilio.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { NotificationProviderRepository } from './application/ports/notification-provider.port';
import { NotificationRepository } from './application/ports/notification.port';
import { GetNotificationByIDUseCase } from './application/use-cases/get-notification-id';
import { GetNotificationsUseCase } from './application/use-cases/get-notifications';
import { SendEmailUseCase } from './application/use-cases/send-email';
import { SendSMSUseCase } from './application/use-cases/send-sms';
import { SendWhatsappUseCase } from './application/use-cases/send-whatsapp';
import { NotificationConsumer } from './infra/events/notification.consumer';
import { NotificationController } from './infra/http/notification.controller';
import { PrismaNotificationRepository } from './infra/persistence/prisma/repositories/prisma-notification.repo';
import { TwilioNotificationRepository } from './infra/services/twilio/repositories/twilio-notification.repo';

@Module({
  imports: [
    DatabaseModule,
    TwilioModule.forRootAsync({
      imports: [EnvModule],
      useFactory: (env: EnvService) => ({
        accountSid: env.get('TWILIO_ACCOUNT_SID'),
        authToken: env.get('TWILIO_AUTH_TOKEN'),
        fromSMSNumber: env.get('TWILIO_PHONE_NUMBER'),
        retryAttempts: 3,
      }),
      inject: [EnvService],
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [EnvModule],
      inject: [EnvService],

      useFactory: (env: EnvService) => ({
        exchanges: [
          {
            name: 'notification',
            type: 'topic',
          },
        ],
        uri: `amqp://${env.get('RABBITMQ_USER')}:${env.get('RABBITMQ_PASSWORD')}@${env.get('RABBITMQ_HOST')}:5672`,
        channels: {
          'channel-1': {
            prefetchCount: 15,
            default: true,
          },
          'channel-2': {
            prefetchCount: 2,
          },
        },
        enableControllerDiscovery: true,
      }),
    }),
  ],
  controllers: [NotificationController],
  providers: [
    SendEmailUseCase,
    SendSMSUseCase,
    SendWhatsappUseCase,
    GetNotificationsUseCase,
    GetNotificationByIDUseCase,

    NotificationConsumer,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
    {
      provide: NotificationProviderRepository,
      useClass: TwilioNotificationRepository,
    },
  ],
})
export class NotificationModule {}
