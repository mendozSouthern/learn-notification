import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './utils/twilio.module-definition';

import { TwilioService } from './twilio.service';

@Module({
  providers: [TwilioService],
  exports: [TwilioService],
})
export class TwilioModule extends ConfigurableModuleClass {}
