import { Injectable } from '@nestjs/common';
import { Attendees } from './entities/attendee.entity';
import { PrismaService } from 'src/database/prisma.service';
import { Participants } from 'src/participants/entities/participant.entity';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class AttendeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(userId: string): Promise<Participants> {
    const participant = await this.prisma.participants.findUnique({
      where: {
        userId: userId,
      },
    });

    return participant;
  }

  async findByEvent(eventId: string): Promise<Event> {
    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    return event;
  }

  async registerAttendee(
    participantId: string,
    eventId: string,
  ): Promise<Attendees> {
    const newEvent = await this.prisma.attendees.create({
      data: {
        eventId,
        participantId,
      },
    });

    return newEvent as Attendees;
  }
}
