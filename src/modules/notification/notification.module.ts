import { EnvModule } from '@/env/env.module';
import { EnvService } from '@/env/infra/env.service';
import { DatabaseModule } from '@/persistence/database/database.module';
import { TwilioModule } from '@/providers/twilio/twilio.module';
import { Module } from '@nestjs/common';
import { NotificationProviderRepository } from './application/ports/notification-provider.port';
import { NotificationRepository } from './application/ports/notification.port';
import { GetNotificationByIDUseCase } from './application/use-cases/get-notification-id';
import { GetNotificationsUseCase } from './application/use-cases/get-notifications';
import { SendEmailUseCase } from './application/use-cases/send-email';
import { SendSMSUseCase } from './application/use-cases/send-sms';
import { SendWhatsappUseCase } from './application/use-cases/send-whatsapp';
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
  ],
  controllers: [NotificationController],
  providers: [
    SendEmailUseCase,
    SendSMSUseCase,
    SendWhatsappUseCase,
    GetNotificationsUseCase,
    GetNotificationByIDUseCase,

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
