import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';

export class Attendees {
  id: string;
  eventId: string;
  participantId: string;
  event?: Event[];
  participant?: User[];
}
