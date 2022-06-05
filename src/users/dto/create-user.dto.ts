import { IsAlpha, IsEmail, IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  age: number;
}
