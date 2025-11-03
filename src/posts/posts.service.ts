import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from './entities/post.entity';


@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {} // <- injeção de dependência

  // posts.service.ts
async create(title: string, content: string, publishedAt: Date, authorId: number) {
  return this.prisma.post.create({
    data: {
      title,
      content,
      publishedAt,
      author: { connect: { id: authorId } },
    },
  });
}

  findAll(): Promise<Post> {
    return this.prisma.post.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  async update(id: number, data: UpdatePostDto) {
    if (!id) {
      throw new Error(`Não há author com o ${id} (${id} not found`);
    }
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
