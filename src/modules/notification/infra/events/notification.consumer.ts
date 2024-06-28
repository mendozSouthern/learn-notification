import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { SendSMSUseCase } from '../../application/use-cases/send-sms';
import { CreateNotificationDto } from '../../domain/dtos/create-notification.dto';

@Injectable()
export class NotificationConsumer {
  private readonly logger = new Logger(NotificationConsumer.name);

  constructor(private readonly sendSMSUC: SendSMSUseCase) {}

  @RabbitSubscribe({
    exchange: 'notification',
    routingKey: 'notification-route',
    queue: 'notifications_queue',
  })
  public async pubSubHandler(msg: CreateNotificationDto) {
    this.logger.log(`Received message: ${JSON.stringify(msg)}`);
    this.sendSMSUC.execute(msg);
  }
}
