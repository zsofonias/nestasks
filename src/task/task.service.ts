import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskCategoryService } from 'src/task-category/task-category.service';
import { TaskCategory } from 'src/task-category/entities/task-category.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly taskCategoryService: TaskCategoryService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { category: categoryId, ...taskData } = createTaskDto;

    let category: TaskCategory;

    if (categoryId) {
      category = await this.taskCategoryService.findOneWithException({
        id: categoryId,
      });
    }
    // } else {
    //   category = await this.taskCategoryService.getDefaultTaskCategoy();
    // }

    const task = this.taskRepository.create({ ...taskData, category });

    return await this.taskRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(filter: FindOptionsWhere<Task>): Promise<Task | undefined> {
    return this.taskRepository.findOneBy(filter);
  }

  async findOneWithException(filter: FindOptionsWhere<Task>): Promise<Task> {
    const task = await this.findOne(filter);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async findOneById(id: string): Promise<Task> {
    const task = await this.findOne({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async findOneByIdAndUpdate(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.findOneById(id);
    // if (
    //   updateTaskDto.status &&
    //   !isValidStatusUpdate(task.status, updateTaskDto.status)
    // ) {
    //   throw new BadRequestException(['Invalid task status update']);
    //   // throw new InvalidTaskStatusException();
    // }
    // const updatedTask = { ...task, ...updateTaskDto };
    Object.assign(task, updateTaskDto);

    return await this.taskRepository.save(task);
  }

  findOneByIdAndUpdateStatus(id: string, updateTaskDto: UpdateTaskDto) {
    return this.findOneByIdAndUpdate(id, updateTaskDto);
  }

  async findOneByIdAndDelete(id: string) {
    const task = await this.findOneById(id);
    return await this.taskRepository.remove(task);
  }
}
