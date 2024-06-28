import type { Notification, Prisma } from '@prisma/client';

export abstract class NotificationRepository {
  abstract find<T extends any>(
    where: Prisma.NotificationWhereUniqueInput,
  ): Promise<Notification | null>;
  abstract findMany(): Promise<Notification[]>;
  abstract create(data: Prisma.NotificationCreateInput): Promise<Notification>;
  abstract update(params: {
    where: Prisma.NotificationWhereUniqueInput;
    data: Prisma.NotificationUpdateInput;
  }): Promise<Notification>;
  abstract delete(
    where: Prisma.NotificationWhereUniqueInput,
  ): Promise<Notification>;

  //   abstract create(data: Document): Promise<Document>
  //   abstract update(id: string, data: Document): Promise<Document>
}
