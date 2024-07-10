import { IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
import { User } from "../schema/user.schema";

export class CreateLikeDto {
    userId: mongoose.Types.ObjectId;
    user: User;
    
    @IsNotEmpty()
    @IsMongoId()
    blogId: mongoose.Types.ObjectId;

}
