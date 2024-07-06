import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UpdateUserProfileDto {
  @IsNotEmpty()
  @IsString()
  userName?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  fullName?: string;

  @IsString()
  bio?: string;

  @IsString()
  website?: string;

  @IsString()
  organizationName?: string;
}
