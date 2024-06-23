import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ParticipantsModule } from './participants/participants.module';
import { OrganizersModule } from './organizers/organizers.module';
import { AttendeesModule } from './attendees/attendees.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    UsersModule,
    EventsModule,
    ParticipantsModule,
    OrganizersModule,
    AttendeesModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
