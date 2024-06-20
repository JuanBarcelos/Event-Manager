import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizerDto {
  @IsNotEmpty()
  @IsString()
  userID: string;

  @IsString()
  bio?: string;

  @IsString()
  website?: string;

  @IsString()
  organizationName?: string;
}
