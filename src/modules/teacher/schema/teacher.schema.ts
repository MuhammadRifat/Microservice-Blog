import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { CommonSchema } from "src/common/schemas/schema.common";

@Schema({ timestamps: true })
export class Teacher extends CommonSchema {
    @Prop()
    teacher_id: string;

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    slug: string;

    @Prop()
    designation: string;

    @Prop({ required: true })
    email: string;

    @Prop()
    phone: string;

    @Prop()
    password: string;

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
    education: string;

    @Prop()
    experience: string;

    @Prop()
    research_activities: string;

    @Prop()
    awards: string;

    @Prop()
    courses: string;

    @Prop()
    contact: string;
}

export const teacherSchema = SchemaFactory.createForClass(Teacher);