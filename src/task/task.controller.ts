import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { TaskService } from './task.service';
import { ITask } from './interfaces/task.interface';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { FindOneParamsDto } from 'src/common/dtos/find-one-params.dto';
import { InvalidTaskStatusException } from './exceptions/invalid-task-status.exception';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskServcie: TaskService) {}
  @Post()
  create(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.taskServcie.create(createTaskDto);
  }

  @Get()
  findAll(): ITask[] {
    return this.taskServcie.findAll();
  }

  @Get(':id')
  findOneById(@Param() { id }: FindOneParamsDto): ITask {
    return this.taskServcie.findOneById(id);
  }

  @Patch(':id')
  findOneByIdAndUpdate(
    @Param() { id }: FindOneParamsDto,
    @Body() updateTaskDto: UpdateTaskDto,
  ): ITask {
    return this.taskServcie.findOneByIdAndUpdate(id, updateTaskDto);
  }

  @Patch(':id/status')
  findOneByIdAndUpdateStatus(
    @Param() { id }: FindOneParamsDto,
    @Body() updateTaskDto: UpdateTaskDto,
  ): ITask {
    try {
      return this.taskServcie.findOneByIdAndUpdateStatus(id, updateTaskDto);
    } catch (err) {
      if (err instanceof InvalidTaskStatusException) {
        throw new BadRequestException([err.message]);
      }
      throw err;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  findOneByIdAndDelete(@Param() { id }: FindOneParamsDto) {
    return this.taskServcie.findOneByIdAndDelete(id);
  }
}
