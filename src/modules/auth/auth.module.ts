import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthRpcController } from './auth-rpc.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '360d' },
    }),
  ],
  controllers: [AuthController, AuthRpcController],
  providers: [AuthService]
})
export class AuthModule { }
