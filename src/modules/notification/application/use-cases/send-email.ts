import { UseCase } from '@/core/application/use-cases/use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendEmailUseCase implements UseCase<any, any> {
  execute(input?: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
