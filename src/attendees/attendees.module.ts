import { Module } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { AttendeesController } from './attendees.controller';
import { AttendeeRepository } from './attendees.repository';
import { PrismaService } from 'src/database/prisma.service';
import { ParticipantsRepository } from 'src/participants/participants.repository';

@Module({
  controllers: [AttendeesController],
  providers: [
    AttendeesService,
    AttendeeRepository,
    PrismaService,
    ParticipantsRepository,
  ],
})
export class AttendeesModule {}
