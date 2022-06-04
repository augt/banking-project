import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
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
    const balance = await this.accountsService.calculateAccountBalance(account)
    const fixedPointBalance = balance.toFixed(2);
    return {your_account_id: account.id, balance:fixedPointBalance } ;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllAccounts(@Request() req): Promise<Account[]> {
    return this.accountsService.findAll(req);
  }
  
}

/* @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  } */