import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMoneytransactionDto } from './dto/create-moneytransaction.dto';
import { UpdateMoneytransactionDto } from './dto/update-moneytransaction.dto';
import { Moneytransaction } from './entities/moneytransaction.entity';

@Injectable()
export class MoneytransactionsService {
  constructor(
    @InjectRepository(Moneytransaction)
    private moneytransactionsRepository: Repository<Moneytransaction>,
  ) {}

  async createMoneytransaction(
    req,
    createMoneytransactionDto: CreateMoneytransactionDto,
  ): Promise<Moneytransaction> {
    console.log(createMoneytransactionDto)
    const newMoneytransaction = await this.moneytransactionsRepository.create({
      orderer: req.user.id,
      debitedAccount:{id:createMoneytransactionDto.debitedAccountId},
      creditedAccount:{id:createMoneytransactionDto.creditedAccountId},
      amount:createMoneytransactionDto.amount
    });

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
