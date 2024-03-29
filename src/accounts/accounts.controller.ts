import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  UnauthorizedException,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AccountsService } from './accounts.service';
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
      blocked: account.isBlocked,
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
        blocked: account.isBlocked,
        balance: fixedPointBalance + '€',
      };
      accountsListWithBalance.push(accountInfos);
    }

    return accountsListWithBalance;
  }

  @UseGuards(JwtAuthGuard)
  @Put('block/:id')
  async blockAccount(
    @Request() req,
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    const updatedAccount = await this.accountsService.blockAccount(
      req,
      id,
      updateAccountDto,
    );
    delete updatedAccount.user;

    return updatedAccount;
  }
}
