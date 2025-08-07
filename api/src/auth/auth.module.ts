import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [AuthService, PrismaService,PrismaClient],
  controllers: [AuthController]
})
export class AuthModule {}
