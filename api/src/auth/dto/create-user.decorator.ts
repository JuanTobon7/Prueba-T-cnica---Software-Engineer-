import { SetMetadata } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export const CreateUser = (...args: string[]) => SetMetadata('create-user', args);

export class CreateUserDto {
    @IsNotEmpty({message: 'First name is required'})
    @IsString({message: 'Fisrt name must be a string'})
    fisrtName: string
    @IsNotEmpty({message: 'Last name is required'})
    @IsString({message: 'Last name must be a string'})
    lastName: string
    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({},{message: 'Email must be a valid email address'})
    email: string
    @IsNotEmpty({message: 'Password is required'})
    @IsStrongPassword({
        minLength: 8, 
        minLowercase: 1, 
        minUppercase: 1, 
        minNumbers: 1, 
        minSymbols: 1}, 
        {message: 'Password must be strong'})
    password: string
}