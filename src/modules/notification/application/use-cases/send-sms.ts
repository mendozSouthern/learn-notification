import { UseCase } from '@/core/application/use-cases/use-case';
import { Injectable } from '@nestjs/common';
import { NotificationType } from '@prisma/client';
import { CreateNotificationDto } from '../../domain/dtos/create-notification.dto';
import { NotificationProviderRepository } from '../ports/notification-provider.port';
import { NotificationRepository } from '../ports/notification.port';

@Injectable()
export class SendSMSUseCase implements UseCase<CreateNotificationDto, string> {
  constructor(
    private readonly notificationRepo: NotificationRepository,
    private readonly notificationProviderRepo: NotificationProviderRepository,
  ) {}

  async execute(input: CreateNotificationDto): Promise<string> {
    const res = await this.notificationProviderRepo.sendSMS({
      content: input.content,
      to: input.to,
    });

    const notification = await this.notificationRepo.create({
      provider: res.provider,
      providerId: res.id,
      type: NotificationType.sms,
      ...input,
    });

    return notification.id!;
  }
}
