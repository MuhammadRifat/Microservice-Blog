import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, studentSchema } from './schema/student.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: studentSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_STUDENT_SECRET,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule { }
