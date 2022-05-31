import { PartialType } from '@nestjs/mapped-types';
import { IsAlpha, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @IsAlpha()
    firstName?: string;

    @IsNotEmpty()
    @IsAlpha()
    lastName?: string;

    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @IsAlpha()
    password?: string;

    @IsNotEmpty()
    @IsNumber()
    age?: number;
}
