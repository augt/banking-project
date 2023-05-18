import { PartialType } from '@nestjs/mapped-types';
import { CreateMoneytransactionDto } from './create-moneytransaction.dto';

export class UpdateMoneytransactionDto extends PartialType(
  CreateMoneytransactionDto,
) {}
