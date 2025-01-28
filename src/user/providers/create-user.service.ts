import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../user.service';
import { generateUsername } from '../helpers/user-service.helpers';
import { generateRandomCryptoString } from 'src/common/utils/string.utils';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  /**
   * Method to create new user in the database
   * @param createUserDto
   * @returns new user
   */
  async create(createUserDto: CreateUserDto) {
    try {
      let { username, email, firstname, lastname } = createUserDto;

      const existingUser = await this.userService.findOne({ email });

      if (existingUser) {
        throw new BadRequestException(
          'Email is already in use, please provide another email',
        );
      }

      if (!username) {
        username = generateUsername([firstname, lastname]);
      }

      const password = generateRandomCryptoString(8);
      // TODO: Hash password

      const newUser: User = this.userRepository.create({
        ...createUserDto,
        username,
        password,
      });

      return await this.userRepository.save(newUser);
    } catch (err) {
      console.log(err);
      if (err instanceof BadRequestException) {
        throw err;
      }
      throw new InternalServerErrorException('Unable to create user');
    }
  }
}
