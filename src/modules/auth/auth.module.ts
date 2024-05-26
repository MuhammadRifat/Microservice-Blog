import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TeacherModule } from 'src/modules/teacher/teacher.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TeacherModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_TEACHER_SECRET,
      signOptions: { expiresIn: '360d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
