import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { MoneytransactionsService } from './moneytransactions.service';
import { CreateMoneytransactionDto } from './dto/create-moneytransaction.dto';
import { UpdateMoneytransactionDto } from './dto/update-moneytransaction.dto';
import { Moneytransaction } from './entities/moneytransaction.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('moneytransactions')
export class MoneytransactionsController {
  constructor(private readonly moneytransactionsService: MoneytransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createUser(@Request() req, @Body() body: CreateMoneytransactionDto): Promise<Moneytransaction> {
     const newMoneytransaction = await this.moneytransactionsService.createMoneytransaction(req, body);
      return newMoneytransaction;
  }
  
}
/* @Post()
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
  } */