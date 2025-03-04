import { IsBoolean, IsEmail, IsEnum, IsMobilePhone, IsMongoId, IsNotEmpty, IsNumberString, IsOptional, IsString, isEnum } from "class-validator";
import mongoose from "mongoose";
import { Types } from "mongoose";

export class IPaginate {
    @IsOptional()
    @IsNumberString()
    limit?: number;

    @IsOptional()
    @IsNumberString()
    page?: number;
}

export class IPaginateMysql {
    @IsOptional()
    @IsNumberString()
    perPage?: number;

    @IsOptional()
    @IsNumberString()
    currentPage?: number;
}


export class QueryCommonDto extends IPaginate {
    @IsOptional()
    @IsString()
    sortBy: string;

    @IsOptional()
    @IsNumberString()
    sortOrder: number;

    @IsOptional()
    @IsEnum({ true: 'true', one: '1', false: 'false', zero: '0' })
    is_active: number;
}

export class MongoIdParams {
    @IsNotEmpty()
    @IsMongoId()
    id: mongoose.Types.ObjectId;
}


export class ContactDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsMobilePhone()
    phone: string;
}


export class SocialLinkDto {
    @IsOptional()
    @IsString()
    facebook: string;

    @IsOptional()
    @IsString()
    twitter: string;

    @IsOptional()
    @IsString()
    youtube: string;
}