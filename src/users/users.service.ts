import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
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
    return this.usersRepository.findOne(email);
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
    /* const user = await this.usersRepository.findOne(createUserDto.email);
    if (user){
      throw new NotAcceptableException();
    } */
    /* const user = await this.usersRepository.findOne(email);
    console.log(email); */
    const newUser = await this.usersRepository.create(createUserDto);

    /* await bcrypt.hash(newUser.password, 10).then((hash) => {
      newUser.password = hash;
    }); */

    await this.usersRepository.save(newUser);

    delete newUser.password;
    return newUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.getOneById(id);
      const updatedUser = { ...user, ...updateUserDto };
      return this.usersRepository.save(updatedUser);
    } catch {
      throw new NotFoundException();
    }

    /* if (updateUserDto.password) {
      user.password = updateUserDto.password;
    } */
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
}
