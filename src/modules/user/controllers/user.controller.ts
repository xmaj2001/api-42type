import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/user.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Get(':id')
  async findById(id: string) {
    return this.userService.findById(id);
  }

  @Get('email/:email')
  async findByEmail(email: string) {
    return this.userService.findByEmail(email);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  async update(id: string, userData: CreateUserDto) {
    return this.userService.update(id, userData);
  }

  @Delete(':id')
  async delete(id: string) {
    return this.userService.delete(id);
  }

}


