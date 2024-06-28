import { Entity } from '@/core/domain/entities/entity';
import { Expose } from 'class-transformer';
import { NotificationProvider } from './notification-provider';
import { NotificationType } from './notification-type';

export interface NotificationProps {
  id?: string;
  type: NotificationType;
  createdAt?: Date;
  content: any;
  read?: boolean;
  readAt?: Date | null;
  userId: string;
  provider: NotificationProvider;
  providerId: string;
}

export class Notification extends Entity<NotificationProps> {
  constructor(props: NotificationProps) {
    super(props);
  }

  @Expose()
  get id() {
    return this.props.id;
  }

  @Expose()
  get type() {
    return this.props.type;
  }

  @Expose()
  get createdAt() {
    return this.props.createdAt;
  }

  @Expose()
  get content() {
    return this.props.content;
  }

  @Expose()
  get read() {
    return this.props.read;
  }

  @Expose()
  get readAt() {
    return this.props.readAt;
  }

  @Expose()
  get provider() {
    return this.props.provider;
  }

  get userId() {
    return this.props.userId;
  }

  get providerId() {
    return this.props.providerId;
  }
}
