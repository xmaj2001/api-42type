import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/user.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userData: CreateUserDto) {
    return this.userService.update(id, userData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

}


