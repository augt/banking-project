import { Module } from '@nestjs/common';
import { MoneytransactionsService } from './moneytransactions.service';
import { MoneytransactionsController } from './moneytransactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moneytransaction } from './entities/moneytransaction.entity';
import { AccountsModule } from 'src/accounts/accounts.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Moneytransaction]), AccountsModule, UsersModule],
  controllers: [MoneytransactionsController],
  providers: [MoneytransactionsService]
})
export class MoneytransactionsModule {}
