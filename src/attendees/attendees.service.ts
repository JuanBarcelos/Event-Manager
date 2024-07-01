import { BadRequestException, Injectable } from '@nestjs/common';
import { AttendeeRepository } from './attendees.repository';
import { Attendees } from './entities/attendee.entity';
import { Request } from 'express';
import { AppService } from 'src/app.service';

@Injectable()
export class AttendeesService {
  constructor(
    private readonly attendeesRepository: AttendeeRepository,
    private readonly appService: AppService,
  ) {}

  async verifyParticipantAndRegisterEvent(
    _request: Request,
    _eventId: string,
  ): Promise<Attendees> {
    const user = await this.appService.decodedRequestToken(_request);
    const existingEvent = await this.attendeesRepository.findByEvent(_eventId);

    if (!existingEvent) throw new BadRequestException('Event is not an exists');

    const newAttendees = await this.attendeesRepository.registerAttendee(
      user.id,
      _eventId,
    );

    return newAttendees;
  }

  async findRegistration(_request: Request, _eventId: string) {
    const user = await this.appService.decodedRequestToken(_request);
    return this.attendeesRepository.findAttendeesByEventAndParticipant(
      _eventId,
      user.id,
    );
  }

  async cancelParticipant(_request: Request, _eventId: string): Promise<void> {
    const attendee = await this.findRegistration(_request, _eventId);
    await this.attendeesRepository.cancelParticipationInTheEvent(attendee.id);
  }

  async findAll(_participantId: string) {
    return await this.attendeesRepository.findAllRegistrations(_participantId);
  }
}
