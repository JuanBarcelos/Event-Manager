import { Event } from 'src/events/entities/event.entity';
import { UserRole } from './user.enum';
import { Participants } from 'src/participants/entities/participant.entity';
import { Attendees } from 'src/attendees/entities/attendee.entity';
import { Organizers } from 'src/organizers/entities/organizer.entity';
import { Comments } from 'src/comments/entities/comment.entity';

export class User {
  id: string;
  userName: string;
  email: string;
  password?: string;
  fullName: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;

  organizers?: Organizers[];
  participants?: Participants[];
  comments?: Comments[];
  event?: Event[];
  attendees?: Attendees[];
}
