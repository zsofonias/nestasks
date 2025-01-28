import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { TaskCategoryModule } from 'src/task-category/task-category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TaskCategoryModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
