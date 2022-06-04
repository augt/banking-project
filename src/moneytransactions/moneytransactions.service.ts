import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/accounts.service';
import { Account } from 'src/accounts/entities/account.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMoneytransactionDto } from './dto/create-moneytransaction.dto';
import { UpdateMoneytransactionDto } from './dto/update-moneytransaction.dto';
import { Moneytransaction } from './entities/moneytransaction.entity';

@Injectable()
export class MoneytransactionsService {
  constructor(
    @InjectRepository(Moneytransaction)
    private moneytransactionsRepository: Repository<Moneytransaction>,
    private accountsService: AccountsService,
    private usersService: UsersService,
  ) {}

  async createMoneytransaction(
    req,
    createMoneytransactionDto: CreateMoneytransactionDto,
  ): Promise<Moneytransaction> {
    const newMoneytransaction = await this.moneytransactionsRepository.create({
      orderer: req.user.id,
      debitedAccount: { id: createMoneytransactionDto.debitedAccountId },
      creditedAccount: { id: createMoneytransactionDto.creditedAccountId },
      amount: createMoneytransactionDto.amount,
    });
    const debitedAccount: Account = await this.accountsService.getOneById(
      newMoneytransaction.debitedAccount.id,
    );
    const creditedAccount: Account = await this.accountsService.getOneById(
      newMoneytransaction.creditedAccount.id,
    );
    if (!debitedAccount || !creditedAccount) {
      throw new BadRequestException();
    }
    if (debitedAccount.isBlocked === true || creditedAccount.isBlocked=== true) {
      throw new UnauthorizedException();
    }

    const user: User | undefined = await this.usersService.getOneById(
      req.user.id,
    );

    if (user && debitedAccount.user.id !== req.user.id) {
      throw new UnauthorizedException();
    }
    const formerBalance = await this.accountsService.calculateAccountBalance(
      debitedAccount,
    );
    const floatTransactionAmount = parseFloat(newMoneytransaction.amount);
    const expectedNewBalance = formerBalance - floatTransactionAmount;

    if (expectedNewBalance < 0) {
      throw new UnauthorizedException();
    }
    await this.moneytransactionsRepository.save(newMoneytransaction);

    return newMoneytransaction;
  }
}
/* create(createMoneytransactionDto: CreateMoneytransactionDto) {
    return 'This action adds a new moneytransaction';
  }

  findAll() {
    return `This action returns all moneytransactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moneytransaction`;
  }

  update(id: number, updateMoneytransactionDto: UpdateMoneytransactionDto) {
    return `This action updates a #${id} moneytransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} moneytransaction`;
  } */
