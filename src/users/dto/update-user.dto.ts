import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from '../entities/user.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  role?: UserRole;
  password?: string;
}
