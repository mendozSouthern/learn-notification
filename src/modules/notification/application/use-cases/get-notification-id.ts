import { UseCase } from '@/core/application/use-cases/use-case';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { Notification, Prisma } from '@prisma/client';
import { NotificationRepository } from '../ports/notification.port';

@Injectable()
export class GetNotificationByIDUseCase
  implements UseCase<string, Notification>
{
  constructor(private readonly notificationRepo: NotificationRepository) {}

  async execute(id: string): Promise<Notification> {
    const notification =
      await this.notificationRepo.find<Prisma.NotificationWhereInput>({ id });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }
}
