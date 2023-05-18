import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { MoneytransactionsService } from './moneytransactions.service';
import { CreateMoneytransactionDto } from './dto/create-moneytransaction.dto';
import { Moneytransaction } from './entities/moneytransaction.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('moneytransactions')
export class MoneytransactionsController {
  constructor(
    private readonly moneytransactionsService: MoneytransactionsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createMoneyTransaction(
    @Request() req,
    @Body() body: CreateMoneytransactionDto,
  ): Promise<Moneytransaction> {
    const newMoneytransaction =
      await this.moneytransactionsService.createMoneytransaction(req, body);
    return newMoneytransaction;
  }
}
