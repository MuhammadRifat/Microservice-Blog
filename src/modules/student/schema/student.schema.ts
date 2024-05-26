import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { CommonSchema } from "src/common/schemas/schema.common";

@Schema({ timestamps: true })
export class Student extends CommonSchema {

    @Prop({ required: true, unique: true })
    student_id: string;

    @Prop({ required: true, unique: true })
    registration_no: string;

    @Prop()
    slug: string;

    @Prop()
    session: string;

    @Prop({ trim: true })
    first_name: string;

    @Prop({ trim: true })
    last_name: string;

    @Prop()
    email: string;

    @Prop()
    phone_number: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true
    })
    department: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true
    })
    faculty: mongoose.Schema.Types.ObjectId;

    @Prop()
    image: string;

    @Prop()
    password: string;
}

export const studentSchema = SchemaFactory.createForClass(Student);