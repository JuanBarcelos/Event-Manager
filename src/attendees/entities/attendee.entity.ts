import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';

export class Attendees {
  eventId: string;
  participantId: string;
  event?: Event[];
  participant?: User[];
}
