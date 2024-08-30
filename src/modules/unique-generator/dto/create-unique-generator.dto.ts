import { IsNotEmpty, IsNumber, IsNumberString, IsOptional } from "class-validator";

export class CreateUniqueGeneratorDto {
    @IsOptional()
    @IsNumberString()
    start: string;

    @IsNotEmpty()
    @IsNumberString()
    end: string;
}
