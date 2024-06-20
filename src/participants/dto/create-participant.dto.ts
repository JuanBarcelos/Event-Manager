import { IsNotEmpty, IsString } from 'class-validator';

export class CreateParticipantDto {
  @IsNotEmpty()
  @IsString()
  userID: string;

  @IsString()
  bio?: string;

  @IsString()
  website?: string;
}
