import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: {name: string, email: string}) {
    return this.userService.create(body.name, body.email);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string,
  @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post(':id/favorites')
  addFavorite(@Param('id') id: string, @Body() body: {postId: number}) {
    return this.userService.addFavorite(+id, body.postId);
  }

  @Get(':id/favorites')
  getFavorites(@Param('id') id: string) {
    return this.userService.getFavorites(+id);
  }
  
}