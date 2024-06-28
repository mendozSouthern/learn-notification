import { UseCase } from '@/core/application/use-cases/use-case';
import { Injectable } from '@nestjs/common';
import type { Notification } from '@prisma/client';
import { NotificationRepository } from '../ports/notification.port';

@Injectable()
export class GetNotificationsUseCase implements UseCase<void, Notification[]> {
  constructor(private readonly notificationRepo: NotificationRepository) {}

  execute(): Promise<Notification[]> {
    return this.notificationRepo.findMany();
  }
}
