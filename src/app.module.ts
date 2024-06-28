import { EnvModule } from '@/env/env.module';
import { Module } from '@nestjs/common';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [EnvModule, NotificationModule],
})
export class AppModule {}
