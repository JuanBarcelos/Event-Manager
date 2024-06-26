import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventRepository } from './events.repository';
import { Event } from './entities/event.entity';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly eventRepository: EventRepository) {}

  async verifyOrganizerAndCreateEvent(
    _id: string,
    _createEventDto: CreateEventDto,
  ): Promise<Event> {
    const existingHostUser = await this.eventRepository.findByOrganizer(_id);

    if (!existingHostUser) {
      throw new ForbiddenException('User is not an organizer');
    }

    const newEvent = await this.eventRepository.createEvent(
      _createEventDto,
      existingHostUser.userId,
    );

    return newEvent;
  }

  async findAll() {
    return this.eventRepository.findAllEvents();
  }

  async updateEvent(_id: string, _requestBody: UpdateEventDto) {
    const updateEvent = await this.eventRepository.updateEvent(
      _requestBody,
      _id,
    );

    return updateEvent;
  }

  async cancelEvent(_id: string): Promise<void> {
    return await this.eventRepository.deleteEvent(_id);
  }
}
