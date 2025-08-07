import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/req/create-user.decorator';
import { LoggingUserDto } from './dto/req/logging-user.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiResponse } from 'src/common/res/dto/api-response.dto';
import { UserResponseDto } from './dto/res/user-response.decorator';
import { LoggingUserResponseDto } from './dto/res/logging-user-response.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @ApiOkResponse({
        description: 'Create user successfully!',
        type: ApiResponse<UserResponseDto>,
    })
    @Post('register')
    async register(@Body() dto: CreateUserDto){
        return await this.authService.createUser(dto);
    }

    @ApiOkResponse({
        description: 'User logged in successfully!',
        type: ApiResponse<LoggingUserResponseDto>
    })
    @Post('login')
    async login(@Body() dto: LoggingUserDto){
        return await this.authService.logIn(dto);
    }
}
