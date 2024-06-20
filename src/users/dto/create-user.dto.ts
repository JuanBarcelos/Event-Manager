import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { UserRole } from '../entities/user.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message: `The password must contain at least 8 characters, 
    including uppercase letters, lowercase letters, and numbers.`,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEnum(UserRole, {
    message: `The value provided for the Role is invalid. 
    Make sure that you are using one of the valid values defined in the enumeration.`,
  })
  role: UserRole;
}
