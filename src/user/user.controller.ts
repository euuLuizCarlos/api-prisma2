import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
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
  async update(@Param('id') id: number, 
  @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Post(':id/favorites')
  addFavorite(@Param('id') id: number, @Body() body: {postId: number}) {
    return this.userService.addFavorite(+id, body.postId);
  }

  @Get(':id/favorites')
  getFavorites(@Param('id') id: number) {
    return this.userService.getFavorites(+id);
  }
  
}
