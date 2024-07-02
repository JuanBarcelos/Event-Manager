import { Attendees } from 'src/attendees/entities/attendee.entity';
import { Comments } from 'src/comments/entities/comment.entity';

export class Event {
  id: string;
  organizerId: string;
  eventName: string;
  eventDate: Date;
  description?: string;
  location: string;
  maxParticipants?: number;
  createdAt?: Date;
  updatedAt?: Date;
  participants?: Attendees[];
  comments?: Comments[];
}
