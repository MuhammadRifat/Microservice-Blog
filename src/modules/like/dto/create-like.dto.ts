import { IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateLikeDto {
    userId: mongoose.Types.ObjectId;
    
    @IsNotEmpty()
    @IsMongoId()
    blogId: mongoose.Types.ObjectId;

}
