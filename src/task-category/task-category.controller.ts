import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';
import { CreateTaskCategoryDto } from './dtos/create-task-category.dto';
import { FindOneParamsDto } from 'src/common/dtos/find-one-params.dto';
import { UpdateTaskCategoryDto } from './dtos/update-task-category.dto';

@Controller('task-categories')
export class TaskCategoryController {
  constructor(private readonly taskCategoryService: TaskCategoryService) {}

  @Post()
  create(@Body() createTaskCategory: CreateTaskCategoryDto) {
    return this.taskCategoryService.create(createTaskCategory);
  }

  @Get()
  findAll() {
    return this.taskCategoryService.findAll();
  }

  @Get(':id')
  findOneById(@Param() { id }: FindOneParamsDto) {
    return this.taskCategoryService.findOneWithException({ id });
  }

  @Patch(':id')
  findOneByIdAndUpdate(
    @Param() { id }: FindOneParamsDto,
    @Body() updateTaskCategoryDto: UpdateTaskCategoryDto,
  ) {
    return this.taskCategoryService.findOneByIdAndUpdate(
      id,
      updateTaskCategoryDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  findOneByIdAndDelete(@Param() { id }: FindOneParamsDto) {
    return this.taskCategoryService.findOneByIdAndDelete(id);
  }
}
