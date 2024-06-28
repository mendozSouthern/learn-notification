import { NotificationRepository } from '@/modules/notification/application/ports/notification.port';
// import { Notification } from '@/modules/notification/domain/entities/notification';
import { PrismaService } from '@/persistence/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import type { Notification, Prisma } from '@prisma/client';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}
  delete(where: Prisma.NotificationWhereUniqueInput): Promise<Notification> {
    return this.prisma.notification.delete({
      where,
    });
  }

  update(params: {
    where: Prisma.NotificationWhereUniqueInput;
    data: Prisma.NotificationUpdateInput;
  }): Promise<Notification> {
    return this.prisma.notification.update({
      where: params.where,
      data: params.data,
    });
  }

  find(
    where: Prisma.NotificationWhereUniqueInput,
  ): Promise<Notification | null> {
    return this.prisma.notification.findFirst({
      where,
    });
  }
  findMany(): Promise<Notification[]> {
    return this.prisma.notification.findMany();
  }

  create(data: Prisma.NotificationCreateInput): Promise<Notification> {
    return this.prisma.notification.create({
      data,
    });
  }
}
