import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { TaskCategory } from './entities/task-category.entity';
import { CreateTaskCategoryDto } from './dtos/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dtos/update-task-category.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskCategoryService {
  constructor(
    @InjectRepository(TaskCategory)
    private readonly taskCategoryRepository: Repository<TaskCategory>,
  ) {}

  async create(createTaskCategoryDto: CreateTaskCategoryDto) {
    const taskCategory = this.taskCategoryRepository.create(
      createTaskCategoryDto,
    );
    return this.taskCategoryRepository.save(taskCategory);
  }

  async findAll() {
    return await this.taskCategoryRepository.find();
  }

  async findOne(filter: FindOptionsWhere<TaskCategory>) {
    return this.taskCategoryRepository.findOneBy(filter);
  }

  async findOneWithException(filter: FindOptionsWhere<TaskCategory>) {
    const taskCategory = await this.findOne(filter);
    if (!taskCategory) {
      throw new NotFoundException('task-category not found');
    }
    return taskCategory;
  }

  async findOneByIdAndUpdate(
    id: string,
    updateTaskCategoryDto: UpdateTaskCategoryDto,
  ) {
    const taskCategory = await this.findOneWithException({ id });
    const mergedTaskCategory = this.taskCategoryRepository.merge(
      taskCategory,
      updateTaskCategoryDto,
    );
    return this.taskCategoryRepository.save(mergedTaskCategory);
  }

  async findOneByIdAndDelete(id: string) {
    const taskCategory = await this.findOneWithException({ id });
    await this.taskCategoryRepository.remove(taskCategory);
  }

  async getDefaultTaskCategoy() {
    let category = await this.findOne({
      name: 'none',
    });
    if (!category) {
      category = await this.create({
        name: 'none',
      });
    }
    return category;
  }
}
