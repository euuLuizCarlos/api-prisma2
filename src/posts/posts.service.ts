import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client'; 

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {} 
  
  async create(data: { title: string; content: string; authorId: number }): Promise<Post> {
    return this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: data.authorId,
      },
    });
  }

  async findAll(authorId?: string, date?: string): Promise<Post[]> {
    const where: any = {};

    if (authorId) {
      where.authorId = Number(authorId);
    }

    if (date) {
      const targetDate = new Date(date);
      
      if (!isNaN(targetDate.getTime())) {
          where.publishedAt = {
              gte: targetDate, 
              lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000), 
          };
      }
    }

    return this.prisma.post.findMany({
      where,
      include: { author: true },
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException(`O Post com ID ${id} não foi encontrado.`);
    }
    return post;
  }

  async update(id: number, data: UpdatePostDto): Promise<Post> {
    await this.findOne(id);
    
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    
    await this.prisma.post.delete({ where: { id } });
    return { message: `Post com ID ${id} removido com sucesso.` };
  }
}