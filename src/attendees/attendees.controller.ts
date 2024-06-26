import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';

@Controller('attendees')
export class AttendeesController {
  constructor(private readonly attendeesService: AttendeesService) {}

  @Post('register-event')
  register(@Body() createAttendeeDto: CreateAttendeeDto) {
    return this.attendeesService.verifyParticipantAndRegisterEvent(
      createAttendeeDto,
    );
  }

  @Get(':userId/event-registration/:eventId')
  async findEventRegistration(
    @Param('userId') userId: string,
    @Param('eventId') eventId: string,
  ) {
    return await this.attendeesService.findRegistration(userId, eventId);
  }

  @Get(':participantId')
  async findAll(@Param('participantId') participantId: string) {
    return await this.attendeesService.findAll(participantId);
  }

  @Delete(':userId/cancel-registration/:eventId')
  async cancelRegistration(
    @Param('userId') userId: string,
    @Param('eventId') eventId: string,
  ) {
    const attendee = await this.attendeesService.findRegistration(
      userId,
      eventId,
    );

    return await this.attendeesService.cancelParticipant(attendee.id);
  }
}
