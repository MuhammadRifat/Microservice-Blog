import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateStudentDto {

    @IsNotEmpty()
    @IsString()
    student_id: string;

    @IsOptional()
    @IsString()
    slug: string;

    @IsNotEmpty()
    @IsString()
    registration_no: string;

    @IsNotEmpty()
    @IsString()
    session: string;

    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone_number: string;

    @IsNotEmpty()
    @IsMongoId()
    department: mongoose.Types.ObjectId;

    @IsNotEmpty()
    @IsMongoId()
    faculty: mongoose.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    image: string;

    @IsOptional()
    @IsString()
    password: string;
}

export class StudentLoginDto {
    @IsNotEmpty()
    @IsString()
    student_id: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
