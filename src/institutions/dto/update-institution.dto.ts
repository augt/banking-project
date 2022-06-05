import { PartialType } from '@nestjs/mapped-types';
import { IsAlphanumeric, IsNotEmpty } from 'class-validator';
import { CreateInstitutionDto } from './create-institution.dto';

export class UpdateInstitutionDto extends PartialType(CreateInstitutionDto) {
  @IsNotEmpty()
  @IsAlphanumeric()
  name: string;
}
