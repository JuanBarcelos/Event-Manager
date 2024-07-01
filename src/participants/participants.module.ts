import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { ParticipantsRepository } from './participants.repository';
import { PrismaService } from 'src/database/prisma.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [ParticipantsController],
  providers: [
    ParticipantsService,
    ParticipantsRepository,
    PrismaService,
    AppService,
  ],
  exports: [ParticipantsService, ParticipantsRepository],
})
export class ParticipantsModule {}
