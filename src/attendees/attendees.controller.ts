import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/entities/user.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Attendees')
@Controller('attendees')
export class AttendeesController {
  constructor(private readonly attendeesService: AttendeesService) {}

  @Post('register-event/:eventId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Roles(UserRole.ATTENDEE)
  register(@Request() req: request, @Param('eventId') eventId: string) {
    return this.attendeesService.verifyParticipantAndRegisterEvent(
      req,
      eventId,
    );
  }

  @Get('find-events-registration/:eventId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Roles(UserRole.ATTENDEE)
  async findEventRegistration(
    @Request() req: request,
    @Param('eventId') eventId: string,
  ) {
    return await this.attendeesService.findRegistration(req, eventId);
  }

  @Get(':participantId')
  async findAll(@Param('participantId') participantId: string) {
    return await this.attendeesService.findAll(participantId);
  }

  @Delete('cancel-registration/:eventId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Roles(UserRole.ATTENDEE)
  async cancelRegistration(
    @Request() req: request,
    @Param('eventId') eventId: string,
  ) {
    return await this.attendeesService.cancelParticipant(req, eventId);
  }
}
