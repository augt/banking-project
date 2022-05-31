import { Module } from '@nestjs/common';
import { MoneytransactionsService } from './moneytransactions.service';
import { MoneytransactionsController } from './moneytransactions.controller';

@Module({
  controllers: [MoneytransactionsController],
  providers: [MoneytransactionsService]
})
export class MoneytransactionsModule {}
