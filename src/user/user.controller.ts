import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindOneParamsDto } from 'src/common/dtos/find-one-params.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  findOneByIdAndDelete(@Param() { id }: FindOneParamsDto) {
    return this.userService.findOneByIdAndDelete(id);
  }
}
