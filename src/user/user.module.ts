import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CreateUserService } from './providers/create-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, CreateUserService],
  controllers: [UserController],
})
export class UserModule {}
