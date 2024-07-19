import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";
import { User } from "../schema/user.schema";

export class CreateCommentDto {
    userId: mongoose.Types.ObjectId;
    user: User;

    @IsNotEmpty()
    @IsMongoId()
    blogId: mongoose.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    comment: string;
}
