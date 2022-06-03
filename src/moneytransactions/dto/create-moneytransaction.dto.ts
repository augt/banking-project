import { IsDecimal, IsNotEmpty, IsNumber, IsPositive, IsUUID, Min } from "class-validator";

export class CreateMoneytransactionDto {

    @IsNotEmpty()
    @IsUUID()
    debitedAccountId: string;

    @IsNotEmpty()
    @IsUUID()
    creditedAccountId: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    amount: string;
}
