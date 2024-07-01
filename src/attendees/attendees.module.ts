import { Module } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { AttendeesController } from './attendees.controller';
import { AttendeeRepository } from './attendees.repository';
import { PrismaService } from 'src/database/prisma.service';
import { ParticipantsModule } from 'src/participants/participants.module';
import { AppService } from 'src/app.service';

@Module({
  imports: [ParticipantsModule],
  controllers: [AttendeesController],
  providers: [AttendeesService, AttendeeRepository, PrismaService, AppService],
})
export class AttendeesModule {}
