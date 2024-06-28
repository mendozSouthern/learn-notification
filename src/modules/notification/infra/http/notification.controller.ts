import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetNotificationByIDUseCase } from '../../application/use-cases/get-notification-id';
import { GetNotificationsUseCase } from '../../application/use-cases/get-notifications';
import { SendSMSUseCase } from '../../application/use-cases/send-sms';
import { CreateNotificationDto } from '../../domain/dtos/create-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly getNotificationsUC: GetNotificationsUseCase,
    private readonly getNotificationByIDUC: GetNotificationByIDUseCase,
    private readonly sendSMSUC: SendSMSUseCase,
  ) {}

  @Get('/')
  public async getNotifications() {
    return this.getNotificationsUC.execute();
  }

  @Get('/:id')
  public async getNotificationByID(id: string) {
    return this.getNotificationByIDUC.execute(id);
  }

  @Post('/sms')
  public async sendSMS(@Body() body: CreateNotificationDto) {
    return this.sendSMSUC.execute(body);
  }
}
