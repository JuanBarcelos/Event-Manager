import { Participants } from 'src/participants/entities/participant.entity';
import { Comment } from 'src/reviews/entities/review.entity';

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
  comments?: Comment[];
}
