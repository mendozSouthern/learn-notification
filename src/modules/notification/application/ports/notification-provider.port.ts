import { NotificationProvider } from '../../domain/entities/notification-provider';

interface NotificationProviderResult {
  id: string;
  provider: NotificationProvider;
}

export interface NotificationSMSData {
  content: string;
  to: string;
}

export abstract class NotificationProviderRepository {
  abstract sendEmail(): Promise<NotificationProviderResult>;
  abstract sendWhatsapp(): Promise<NotificationProviderResult>;
  abstract sendSMS(
    data: NotificationSMSData,
  ): Promise<NotificationProviderResult>;
}
