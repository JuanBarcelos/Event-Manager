import { Injectable } from '@nestjs/common';
import { Attendees } from './entities/attendee.entity';
import { PrismaService } from 'src/database/prisma.service';
import { Participants } from 'src/participants/entities/participant.entity';

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

  async findByEvent(eventId: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        _count: {
          select: {
            participants: true,
          },
        },
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

  async findAttendeesByEventAndParticipant(
    _eventId: string,
    _participantId: string,
  ): Promise<Attendees> {
    return this.prisma.attendees.findUnique({
      where: {
        Unique_Event_Participant: {
          eventId: _eventId,
          participantId: _participantId,
        },
      },
    });
  }

  async cancelParticipationInTheEvent(_id: string): Promise<void> {
    await this.prisma.attendees.delete({
      where: {
        id: _id,
      },
    });
  }

  async findAllRegistrations(_participantId: string) {
    return await this.prisma.attendees.findMany({
      where: {
        participantId: _participantId,
      },
      include: {
        event: true,
      },
    });
  }
}
