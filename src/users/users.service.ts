import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  async getOneById(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      return user;
    } catch (err) {
      //handle error
      throw err;
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.usersRepository.create(createUserDto);

      await hash(newUser.password, 10).then((hash) => {
        newUser.password = hash;
      });

      await this.usersRepository.save(newUser);

      delete newUser.password;
      return newUser;
    } catch {
      throw new BadRequestException();
    }
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
    req,
  ): Promise<User> {
    try {
      if (req.user.id !== id) {
        throw new UnauthorizedException();
      }
      const user = await this.getOneById(id);

      if (updateUserDto.password) {
        await hash(updateUserDto.password, 10).then((hash) => {
          updateUserDto.password = hash;
        });
      }

      const updatedUser = { ...user, ...updateUserDto };

      return this.usersRepository.save(updatedUser);
    } catch {
      if (req.user.id !== id) {
        throw new UnauthorizedException();
      }
      throw new NotFoundException();
    }
  }
}
