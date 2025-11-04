// src/user/user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common'; 
import { CreateUserDto } from './dto/create-user.dto'; 
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async create(name: string, email: string): Promise<User> {
    return this.prisma.user.create({
      data: { name, email },
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`O Usuário com ID ${id} não existe.`);
    }
    return user;
  }

  async update(id: number, data: { name?: string; email?: string }): Promise<User> {
    await this.findOne(id); 
    
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id); 
    await this.prisma.user.delete({ where: { id } });
    return { message: `Usuário com ID ${id} removido com sucesso.` };
  }

  async addFavorite(userId: number, postId: number) {
  return this.prisma.favorite.create({
    data: { userId, postId },
  });
}
  async getFavorites(userId: number) {
  return this.prisma.favorite.findMany({
    where: { userId },
    include: { post: true },
  });
}
  
}