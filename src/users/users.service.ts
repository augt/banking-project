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
const bcrypt = require('bcrypt');
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email: email });
  }

  async getOneById(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail(id);
      return user;
    } catch (err) {
      //handle error
      throw err;
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {

    try {
      const newUser = await this.usersRepository.create(createUserDto);

    await bcrypt.hash(newUser.password, 10).then((hash) => {
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
        throw new BadRequestException();
      }
      const user = await this.getOneById(id);

      if (updateUserDto.password) {
        await bcrypt.hash(updateUserDto.password, 10).then((hash) => {
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


/* create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  } */