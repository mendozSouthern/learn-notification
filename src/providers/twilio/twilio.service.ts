import { Inject, Injectable } from '@nestjs/common';

import {
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './utils/twilio.module-definition';
import { createTwilioClient } from './utils/twilio.utils';

import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/message';
import type { TwilioClient } from './utils/twilio.interface';

@Injectable()
export class TwilioService {
  private readonly client: TwilioClient;
  //   private readonly logger = new Logger(TwilioService.name);
  //   private queue = new PQueue({ concurrency: 1 });

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: typeof OPTIONS_TYPE,
  ) {
    this.client = createTwilioClient(this.options);
  }

  private async sendSms(options: MessageListInstanceCreateOptions) {
    return this.client.messages.create(options);
  }

  send(options: Omit<MessageListInstanceCreateOptions, 'from'>) {
    return this.sendSms({ ...options, from: this.options.fromSMSNumber ?? '' });
    // return this.queue.add(() =>
    //   pRetry(() => this.sendSms(options), {
    //     onFailedAttempt: (error) => {
    //       this.logger.debug(
    //         `SMS to ${options.to} failed, retrying (${error.retriesLeft} attempts left)`,
    //         error,
    //       );
    //     },
    //     retries: this.options.retryAttempts ?? 3,
    //   }),
    // );
  }
}
