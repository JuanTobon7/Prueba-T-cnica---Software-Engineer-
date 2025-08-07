import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.decorator';
import { LoggingUser, LoggingUserUserDto } from './dto/logging-user.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiResponse } from 'src/common/res/dto/api-response.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @ApiOkResponse({
        description: 'Create user successfully!',
        type: ApiResponse,
    })
    @Post('register')
    async register(@Body() dto: CreateUserDto){
        await this.authService.createUser(dto);
    }

    @ApiOkResponse({
        description: 'User logged in successfully!',
        type: ApiResponse        
    })
    @Post('login')
    async login(@Body() dto: LoggingUserUserDto){
        await this.authService.logIn(dto);
        return 'User logged in successfully!';
    }
}
