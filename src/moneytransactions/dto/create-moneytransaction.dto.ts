import { IsDecimal, IsNotEmpty, IsNumber, IsPositive, IsUUID } from "class-validator";

export class CreateMoneytransactionDto {

    @IsNotEmpty()
    @IsUUID()
    debitedAccountId: string;

    @IsNotEmpty()
    @IsUUID()
    creditedAccountId: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    amount: string;
}
