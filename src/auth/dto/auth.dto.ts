import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Min(6)
    password: string;
}