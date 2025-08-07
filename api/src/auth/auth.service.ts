import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.decorator'; 
import { PrismaService } from 'prisma/prisma.service'; 
import { User } from '@prisma/client'; 
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService){}

    private async EncryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password,10);
    }

    async createUser(dto: CreateUserDto): Promise<void>{
        const encryptedPassword = await this.EncryptPassword(dto.password)
        if(await this.prismaService.user.findUnique({where: {email: dto.email}})){
            
        }
        const user = await this.prismaService.user.create({data:{
            fisrt_name: dto.fisrtName,
            last_name: dto.lastName,
            email: dto.email,
            password: encryptedPassword
        }})
        if(!user) throw new Error('User not created')
    }
    async logIn(email: string):Promise<User | null>{
        const user = await this.prismaService.user.findUnique({where: {email}})
        return user;
    }
}
