import { IsAlphanumeric, IsNotEmpty } from "class-validator";

export class CreateInstitutionDto {
    @IsNotEmpty()
    @IsAlphanumeric()
    name: string;


}
