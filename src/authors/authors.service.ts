import { HttpException, Injectable, NotFoundException } from '@nestjs/common'; 
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Author } from '@prisma/client';

@Injectable()
export class AuthorsService {
    constructor(private prisma: PrismaService) {}
  
  async create(userId: number, bio: string): Promise<Author> {
    const author = await this.prisma.author.findUnique({ where: { userId } });
    if (author) {
      throw new HttpException(`AUTHOR_ALREADY_EXISTS: Usuário já possui um perfil de autor.`, 400);
    }
    return this.prisma.author.create({
      data: {userId, bio},
    });
  }
  
  findAll(): Promise<Author[]> {
      return this.prisma.author.findMany();
    }
  
  async findOne(id: number): Promise<Author> {
    const author = await this.prisma.author.findUnique({ where: { id } });
    if (!author) {
      throw new NotFoundException(`O Author com ID ${id} não foi encontrado.`);
    }
    return author;
  }

  async update(id: number, data:{bio?: string}): Promise<Author> {
    await this.findOne(id); 

    return this.prisma.author.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id); 

    await this.prisma.author.delete({ where: { id } });
    return { message: `Author com ID ${id} removido com sucesso.` };
  }
}