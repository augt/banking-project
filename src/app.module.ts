import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { MoneytransactionsModule } from './moneytransactions/moneytransactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [
    UsersModule,
    AccountsModule,
    InstitutionsModule,
    MoneytransactionsModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
