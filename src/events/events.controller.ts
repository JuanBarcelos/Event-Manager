import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRole } from 'src/users/entities/user.enum';
import { Request as request } from 'express';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('create')
  @Roles(UserRole.ORGANIZER)
  @UseGuards(AuthGuard)
  createEventIfOrganizer(
    @Request() req: request,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventsService.verifyOrganizerAndCreateEvent(
      req,
      createEventDto,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.eventsService.findAll();
  }

  @Put('update/:id')
  @Roles(UserRole.ORGANIZER)
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() requestBody: UpdateEventDto) {
    return this.eventsService.updateEvent(id, requestBody);
  }

  @Delete('cancel/:id')
  @Roles(UserRole.ORGANIZER)
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.eventsService.cancelEvent(id);
  }
}
