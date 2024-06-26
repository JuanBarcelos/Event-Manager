import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Organizers } from 'src/organizers/entities/organizer.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventRepository {
  constructor(private prisma: PrismaService) {}

  async findByOrganizer(userId: string): Promise<Organizers> {
    const organizer = await this.prisma.organizers.findUnique({
      where: {
        userId: userId,
      },
    });

    return organizer;
  }

  async createEvent(
    createEventDto: CreateEventDto,
    userId: string,
  ): Promise<Event> {
    const { eventName, location, description, maxParticipants } =
      createEventDto;
    const newEvent = await this.prisma.event.create({
      data: {
        eventName,
        eventDate: new Date(),
        location,
        description,
        maxParticipants,
        organizerId: userId,
      },
    });

    return newEvent as Event;
  }

  async findAllEvents() {
    return this.prisma.event.findMany({
      include: {
        comments: true,
        organizer: true,
      },
    });
  }

  async updateEvent(_requestBody: UpdateEventDto, _id: string): Promise<Event> {
    const updateEvent = await this.prisma.event.update({
      where: {
        id: _id,
      },
      data: {
        ..._requestBody,
        eventDate: _requestBody.eventDate,
      },
    });

    return updateEvent;
  }

  async deleteEvent(_id: string): Promise<void> {
    await this.prisma.event.delete({
      where: {
        id: _id,
      },
    });
  }
}
