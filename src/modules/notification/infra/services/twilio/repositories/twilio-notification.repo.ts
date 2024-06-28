import {
  NotificationProviderRepository,
  NotificationSMSData,
} from '@/modules/notification/application/ports/notification-provider.port';
import { NotificationProvider } from '@/modules/notification/domain/entities/notification-provider';
import { TwilioService } from '@/providers/twilio/twilio.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TwilioNotificationRepository
  implements NotificationProviderRepository
{
  protected logger = new Logger(TwilioNotificationRepository.name);
  constructor(private readonly twilio: TwilioService) {}

  sendEmail(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  sendWhatsapp(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async sendSMS(data: NotificationSMSData) {
    const resp = await this.twilio.send({
      body: data.content,
      to: data.to,
    });

    this.logger.log(resp);
    return {
      id: resp.sid,
      provider: NotificationProvider.Twilio,
    };
  }
}
