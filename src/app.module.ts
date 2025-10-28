import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthorsModule } from './authors/authors.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [PrismaModule, UserModule, AuthorsModule, PostModule],
})
export class AppModule {}