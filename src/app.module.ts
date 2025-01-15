import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [TaskModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
