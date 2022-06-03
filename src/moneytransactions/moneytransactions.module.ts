import { Module } from '@nestjs/common';
import { MoneytransactionsService } from './moneytransactions.service';
import { MoneytransactionsController } from './moneytransactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moneytransaction } from './entities/moneytransaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Moneytransaction])],
  controllers: [MoneytransactionsController],
  providers: [MoneytransactionsService]
})
export class MoneytransactionsModule {}
