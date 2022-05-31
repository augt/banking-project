import { Injectable } from '@nestjs/common';
import { CreateMoneytransactionDto } from './dto/create-moneytransaction.dto';
import { UpdateMoneytransactionDto } from './dto/update-moneytransaction.dto';

@Injectable()
export class MoneytransactionsService {
  create(createMoneytransactionDto: CreateMoneytransactionDto) {
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
  }
}
