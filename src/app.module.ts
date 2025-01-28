import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { TaskModule } from './task/task.module';
import { CommonModule } from './common/common.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskCategoryModule } from './task-category/task-category.module';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';

const ENV = process.env.NODE_ENV;
const envFilePath = !ENV ? `.env` : `.env.${ENV}.local`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath,
      validationSchema: environmentValidation,
    }),
    DatabaseModule,
    TaskModule,
    CommonModule,
    UserModule,
    TaskCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
