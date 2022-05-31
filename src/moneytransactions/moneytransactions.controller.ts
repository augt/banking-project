import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoneytransactionsService } from './moneytransactions.service';
import { CreateMoneytransactionDto } from './dto/create-moneytransaction.dto';
import { UpdateMoneytransactionDto } from './dto/update-moneytransaction.dto';

@Controller('moneytransactions')
export class MoneytransactionsController {
  constructor(private readonly moneytransactionsService: MoneytransactionsService) {}

  @Post()
  create(@Body() createMoneytransactionDto: CreateMoneytransactionDto) {
    return this.moneytransactionsService.create(createMoneytransactionDto);
  }

  @Get()
  findAll() {
    return this.moneytransactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moneytransactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoneytransactionDto: UpdateMoneytransactionDto) {
    return this.moneytransactionsService.update(+id, updateMoneytransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moneytransactionsService.remove(+id);
  }
}
