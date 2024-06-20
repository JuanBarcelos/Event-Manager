import { Controller, Post, Body } from '@nestjs/common';
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
}
