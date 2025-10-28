import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }

  constructor(private prisma: PrismaService) {}

  async create(name: string, email: string) {
    return this.prisma.user.create({
      data: {name, email},
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

}
