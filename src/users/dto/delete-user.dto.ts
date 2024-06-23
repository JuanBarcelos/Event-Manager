import { IsEmail, IsNotEmpty } from 'class-validator';

export class DeleteUserAccount {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
