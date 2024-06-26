import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AttendeeRepository } from './attendees.repository';
import { ParticipantsRepository } from 'src/participants/participants.repository';
import { Attendees } from './entities/attendee.entity';
import { CreateAttendeeDto } from './dto/create-attendee.dto';

@Injectable()
export class AttendeesService {
  constructor(
    private readonly attendeesRepository: AttendeeRepository,
    private readonly participantsRepository: ParticipantsRepository,
  ) {}

  async verifyParticipantAndRegisterEvent(
    createAttendeeDto: CreateAttendeeDto,
  ): Promise<Attendees> {
    const { participantId, eventId } = createAttendeeDto;

    const existingUser =
      await this.participantsRepository.findUserById(participantId);

    if (!existingUser) {
      throw new ForbiddenException('User is not an participants');
    }

    const existingEvent = await this.attendeesRepository.findByEvent(eventId);

    if (!existingEvent) {
      throw new BadRequestException('Event is not an exists');
    }

    const newAttendees = await this.attendeesRepository.registerAttendee(
      participantId,
      eventId,
    );

    return newAttendees;
  }

  async findRegistration(userId: string, eventId: string) {
    return this.attendeesRepository.findAttendeesByEventAndParticipant(
      eventId,
      userId,
    );
  }

  async cancelParticipant(_id: string): Promise<void> {
    await this.attendeesRepository.cancelParticipationInTheEvent(_id);
  }

  async findAll(_participantId: string) {
    return await this.attendeesRepository.findAllRegistrations(_participantId);
  }
}
