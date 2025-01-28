import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

import { CreateUserService } from './providers/create-user.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => CreateUserService))
    private readonly createUserService: CreateUserService,
  ) {}

  /**
   * Creates new user in the database
   * @param createUserDto
   * @returns new user
   */
  async create(createUserDto: CreateUserDto) {
    return this.createUserService.create(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(filter: FindOptionsWhere<User>) {
    return await this.userRepository.findOneBy(filter);
  }

  async findOneWithException(filter: FindOptionsWhere<User>) {
    const user = await this.findOne(filter);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByIdAndUpdate() {}

  async findOneByIdAndDelete(id: string) {
    const user = await this.findOneWithException({ id });
    await this.userRepository.remove(user);
  }
}
