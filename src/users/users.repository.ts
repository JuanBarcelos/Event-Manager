import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async updateUserProfile(userId: string, updateUserDto: UpdateUserDto) {
    const userProfileUpdate = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: updateUserDto,
      include: {
        organizers: true,
        participants: true,
      },
    });

    return userProfileUpdate;
  }

  async deleteUserAccount(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
