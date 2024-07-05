import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserAuthGuard } from 'src/common/guards/user-auth.guard';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }


    @Post('user/register')
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            const data = await this.authService.userRegistration(createUserDto);

            return {
                success: true,
                ...data
            }
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @Post('user/login')
    async login(@Body() loginDto: LoginDto) {
        try {
            const data = await this.authService.userLogin(loginDto);

            return {
                success: true,
                ...data
            }
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @Get('user')
    @UseGuards(UserAuthGuard)
    async getProfile(
        @Req() req
    ) {
        try {
            const user = await this.authService.userProfile(req.user.id);
            
            return {
                success: true,
                data: user
            }
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
}
