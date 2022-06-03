import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinColumn, Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountsRepository: Repository<Account>,
  ) {}

  async createAccount(req): Promise<Account> {
    const newAccount = await this.accountsRepository.create({
      user: req.user.id,
    });

    return this.accountsRepository.save(newAccount);
  }

  async getOneById(id: string): Promise<Account> {
    try {
      const account = await this.accountsRepository.findOneOrFail(id, {
        relations: ['user','debitMoneytransactions', 'creditMoneytransactions']
      });
      return account;
    } catch (err) {
      //handle error
      throw err;
    }
  }

  findAll(req): Promise<Account[]> {
    return this.accountsRepository.find({ where: { user: req.user.id } });
  }
}

/* create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  } */
