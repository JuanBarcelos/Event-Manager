import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<any> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { userName, email, password, fullName, role } = createUserDto;

    const newUser = await this.prisma.user.create({
      data: {
        userName,
        email,
        password,
        fullName,
        role,
      },
    });

    return newUser as User;
  }
}
