import { IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  content: string;
  @IsString()
  userId: string;
  @IsString()
  to: string;
}
