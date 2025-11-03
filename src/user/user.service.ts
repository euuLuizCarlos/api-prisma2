import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async create(name: string, email: string) {
    return this.prisma.user.create({
      data: {name, email},
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    if (!id) {
      throw new NotFoundException(`O Usuário ${id} não existe (the user ${id} not found`);
    } 
    return this.prisma.user.findUnique({ where: { id } });
  } 

  update(id: number, data:{name?: string; email?: string}) {
    if (!id) {
      throw new NotFoundException(`O Usuário ${id} não existe (the user ${id} not found`);
    }
    return this.prisma.user.update({where: { id }, data, });
  }
}
