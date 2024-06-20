import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ParticipantsModule } from './participants/participants.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrganizersModule } from './organizers/organizers.module';
import { AttendeesModule } from './attendees/attendees.module';

@Module({
  imports: [
    UsersModule,
    EventsModule,
    ParticipantsModule,
    ReviewsModule,
    OrganizersModule,
    AttendeesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
