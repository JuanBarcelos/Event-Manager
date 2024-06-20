import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAttendeeDto {
  @IsNotEmpty()
  @IsString()
  eventId: string;

  @IsNotEmpty()
  @IsString()
  participantId: string;
}
