import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createAccount(@Request() req) {
    const newAccount = await this.accountsService.createAccount(req);
    return newAccount;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneAccount(@Request() req, @Param('id') id: string) {
    const account = await this.accountsService.getOneById(id);
    if (account.user.id !== req.user.id) {
      throw new UnauthorizedException();
    }
    const transactionsArray = account.debitMoneytransactions.concat(
      account.creditMoneytransactions,
    );
    transactionsArray.sort((a, b) => b.id - a.id);
    if (transactionsArray.length > 30) {
      transactionsArray.splice(30, transactionsArray.length - 30);
    }

    const balance = await this.accountsService.calculateAccountBalance(account);
    const fixedPointBalance = balance.toFixed(2);
    return {
      your_account_id: account.id,
      balance: fixedPointBalance,
      transactions_history: transactionsArray,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllAccounts(@Request() req) {
    const accountsArray: Account[] = await this.accountsService.findAll(req);

    const accountsListWithBalance = [];
    for (let account of accountsArray) {
      const balance = await this.accountsService.calculateAccountBalance(
        account,
      );
      const fixedPointBalance = balance.toFixed(2);
      const accountInfos = {
        account_id: account.id,
        balance: fixedPointBalance + '€',
      };
      accountsListWithBalance.push(accountInfos);
    }

    return accountsListWithBalance;
  }
}
