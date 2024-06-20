import { Controller, Post, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('create-event/:userId')
  createEventIfOrganizer(
    @Param('userId') id: string,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventsService.verifyOrganizerAndCreateEvent(id, createEventDto);
  }
}
