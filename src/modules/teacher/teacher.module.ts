import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, teacherSchema } from './schema/teacher.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: teacherSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_TEACHER_SECRET,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule { }
