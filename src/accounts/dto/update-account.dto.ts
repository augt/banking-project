import { PartialType } from '@nestjs/mapped-types';
import { IsISO8601, IsNotEmpty } from 'class-validator';
import { CreateAccountDto } from './create-account.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
    @IsISO8601()
    @IsNotEmpty()
    blockDate: string
}
