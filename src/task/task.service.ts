import { randomUUID } from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ITask } from './interfaces/task.interface';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { isValidStatusUpdate } from './helpers/task-servcie.helper';
import { InvalidTaskStatusException } from './exceptions/invalid-task-status.exception';

@Injectable()
export class TaskService {
  private tasks: ITask[] = [];

  create(createTaskDto: CreateTaskDto): ITask {
    const task = {
      id: randomUUID(),
      ...createTaskDto,
    };
    this.tasks.push(task);
    return task;
  }

  findAll(): ITask[] {
    return this.tasks;
  }

  findOne({ key, value }: { key: any; value: any }): ITask | undefined {
    return this.tasks.find((task) => task[key] === value);
  }

  findOneWithException({ key, value }: { key: any; value: any }): ITask {
    const task = this.tasks.find((task) => task[key] === value);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  findOneById(id: string): ITask {
    const task = this.findOne({ key: 'id', value: id });
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return task;
  }

  findOneByIdAndUpdate(id: string, updateTaskDto: UpdateTaskDto): ITask {
    const taskUpdate = this.findOneById(id);
    if (
      updateTaskDto.status &&
      !isValidStatusUpdate(taskUpdate.status, updateTaskDto.status)
    ) {
      // throw new BadRequestException(['Invalid tasks status update']);
      throw new InvalidTaskStatusException();
    }
    // const updatedTask = { ...task, ...updateTaskDto };
    Object.assign(taskUpdate, updateTaskDto);
    this.tasks = this.tasks.map((task) => (task.id === id ? taskUpdate : task));
    return taskUpdate;
  }

  findOneByIdAndUpdateStatus(id: string, updateTaskDto: UpdateTaskDto) {
    return this.findOneByIdAndUpdate(id, updateTaskDto);
  }

  findOneByIdAndDelete(id: string) {
    this.findOneById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return;
  }
}
