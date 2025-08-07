import { SetMetadata } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export const LoggingUser = (...args: string[]) => SetMetadata('logging-user', args);

export class LoggingUserResponseDto {
    @ApiProperty({ example: 'john@example.com', description: 'User email for login' })
    email: string
    
}