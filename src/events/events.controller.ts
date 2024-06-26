import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

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

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() requestBody: UpdateEventDto) {
    return this.eventsService.updateEvent(id, requestBody);
  }

  @Delete(':id/cancel')
  delete(@Param('id') id: string) {
    return this.eventsService.cancelEvent(id);
  }
}
