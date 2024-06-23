import { Comments } from 'src/comments/entities/comment.entity';
import { Participants } from 'src/participants/entities/participant.entity';

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
  participants?: Participants[];
  comments?: Comments[];
}
