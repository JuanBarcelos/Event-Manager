import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventRepository } from './events.repository';
import { Event } from './entities/event.entity';
import { UpdateEventDto } from './dto/update-event.dto';
import { AppService } from 'src/app.service';
import { Request } from 'express';

@Injectable()
export class EventsService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly appService: AppService,
  ) {}

  async verifyOrganizerAndCreateEvent(
    _request: Request,
    _createEventDto: CreateEventDto,
  ): Promise<Event> {
    const user = await this.appService.decodedRequestToken(_request);
    const newEvent = await this.eventRepository.createEvent(
      _createEventDto,
      user.id,
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
