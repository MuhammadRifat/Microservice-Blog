import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";
import { IPaginate } from "src/common/dtos/dto.common";

export class QueryLikeDto extends IPaginate {

    @IsOptional()
    @IsString()
    @IsMongoId()
    _id?: mongoose.Types.ObjectId;

    @IsOptional()
    @IsString()
    @IsMongoId()
    blogId?: mongoose.Types.ObjectId;

    @IsOptional()
    @IsString()
    @IsMongoId()
    userId?: mongoose.Types.ObjectId;
}
