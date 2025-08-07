import { Body, Controller, HttpCode, Post, Put, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/req/create-user.decorator';
import { LoggingUserDto } from './dto/req/logging-user.decorator';
import { ApiBadRequestResponse, ApiConflictResponse, ApiExtraModels, ApiOkResponse, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiResponse } from 'src/common/res/dto/api-response.dto';
import { UserResponseDto } from './dto/res/user-response.decorator';
import type { Response } from 'express';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @ApiExtraModels(ApiResponse, UserResponseDto)
      @ApiOkResponse({
        description: 'User registered successfully!',
        schema: {
          allOf: [
            { $ref: getSchemaPath(ApiResponse) },
            {
              properties: {
                data: { $ref: getSchemaPath(UserResponseDto) },
              },
            },
          ],
        },        
      })
    @HttpCode(201)
    @ApiConflictResponse({description: 'Conflict - Email already in use'})
    @ApiBadRequestResponse({description: 'Bad Request - Invalid input data'})
    @Post('register')
    async register(@Body() dto: CreateUserDto){
        const response = await this.authService.createUser(dto);
        return ApiResponse.created(response)
    }

    @ApiExtraModels(ApiResponse, UserResponseDto)
      @ApiOkResponse({
        description: 'User logged successfully!',
        schema: {
          allOf: [
            { $ref: getSchemaPath(ApiResponse) },
            {
              properties: {
                data: { $ref: getSchemaPath(UserResponseDto) },
              },
            },
            ],
        },       
        headers: {
              'Set-Cookie': {
                  description: 'Set cookie with JWT token',
                  example: 'access_token=token_exmaple'
                }
            }
      })
    @HttpCode(200)
    @ApiUnauthorizedResponse({description: 'Unauthorized - Invalid credentials'})
    @ApiBadRequestResponse({description: 'Bad Request - Invalid input data'})
    @Post('login')
    async login(@Body() dto: LoggingUserDto, @Res({ passthrough: true }) response: Response){
        const token = await this.authService.logIn(dto);
        response.cookie('access_token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'PRODUCTION',
            sameSite: 'strict'            
        })
        return 'Logged in successfully'
    }
}
