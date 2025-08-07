import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.decorator'; 
import { PrismaService } from 'prisma/prisma.service'; 
import { User } from '@prisma/client'; 
import * as bcrypt from 'bcrypt';
import { LoggingUserUserDto } from './dto/logging-user.decorator';
@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService){}

    private async EncryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password,10);
    }

    private async ComparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    async createUser(dto: CreateUserDto): Promise<void>{
        const encryptedPassword = await this.EncryptPassword(dto.password)
        if(await this.prismaService.user.findUnique({where: {email: dto.email}})){
            
        }
        const user = await this.prismaService.user.create({data:{
            first_name: dto.firstName,
            last_name: dto.lastName,
            email: dto.email,
            password: encryptedPassword
        }})
        if(!user) return 
    }
    async logIn(dto: LoggingUserUserDto):Promise<User | null>{
        const user = await this.prismaService.user.findUnique({where: {email: dto.email}})
        if(!user) throw new NotFoundException(`User not found with email: ${dto.email}`)
        const isPasswordValid = await this.ComparePassword(dto.password, user.password);
        if(!isPasswordValid) throw new UnauthorizedException('Invalid Password');
        return user;
    }
}
