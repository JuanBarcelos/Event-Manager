import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { hash } from 'bcryptjs';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user.enum';
import { OrganizersService } from 'src/organizers/organizers.service';
import { ParticipantsService } from 'src/participants/participants.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly organizersService: OrganizersService,
    private readonly participantsService: ParticipantsService,
  ) {}

  async create(_createUserDto: CreateUserDto): Promise<User> {
    const { userName, email, password, fullName, role } = _createUserDto;

    const userWithExistingEmail = await this.userRepository.findByEmail(email);

    if (userWithExistingEmail !== null) {
      throw new BadRequestException('This e-mail is already registered.');
    }

    const hashedPassword = await hash(password, 8);

    const newUser = await this.userRepository.createUser({
      userName,
      email,
      password: hashedPassword,
      fullName,
      role,
    });

    if (newUser.role === UserRole.ORGANIZER) {
      await this.organizersService.create({
        userID: newUser.id,
      });
    } else {
      await this.participantsService.create({
        userID: newUser.id,
      });
    }

    return newUser;
  }
}
