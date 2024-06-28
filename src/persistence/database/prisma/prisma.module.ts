import { EnvModule } from '@/env/env.module';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  imports: [EnvModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
