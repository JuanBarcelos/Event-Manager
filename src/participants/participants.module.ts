import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { ParticipantsRepository } from './participants.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService, ParticipantsRepository, PrismaService],
})
export class ParticipantsModule {}
