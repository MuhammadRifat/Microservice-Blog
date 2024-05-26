import { Types } from "mongoose";
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateTeacherDto {
    
    @IsNotEmpty()
    @IsString()
    teacher_id: string;
    
    @IsNotEmpty()
    @IsString()
    first_name: string;
    
    @IsNotEmpty()
    @IsString()
    last_name: string;
    
    @IsOptional()
    @IsString()
    slug: string;
    
    @IsNotEmpty()
    @IsString()
    designation: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    phone: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
    
    @IsNotEmpty()
    @IsMongoId()
    department: Types.ObjectId;
    
    @IsNotEmpty()
    @IsMongoId()
    faculty: Types.ObjectId;
    
    @IsNotEmpty()
    @IsString()
    image: string;
    
    @IsOptional()
    @IsString()
    education: string;
    
    @IsOptional()
    @IsString()
    experience: string;
    
    @IsOptional()
    @IsString()
    awards: string;
    
    @IsOptional()
    @IsString()
    courses: string;
    
    @IsOptional()
    @IsString()
    contact: string;
}