import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('tasks')
export class TaskController {
  @Post()
  createOne() {
    return `Create a task endpoint`;
  }

  @Get()
  findAll() {
    return `Find tasks endpoint`;
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return 'Find task by id endpoint';
  }
}
