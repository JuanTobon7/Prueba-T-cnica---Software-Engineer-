import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateTasksDto } from './dto/create-tasks/create-tasks.decorator';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiCreatedResponse, ApiUnauthorizedResponse, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';
import { ApiResponse } from 'src/common/res/dto/api-response.dto';
import { TasksService } from './tasks.service';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/common/conf/jwt.guard';
import * as jwt from 'jsonwebtoken';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  private  verifyToken(token: string){
      try {
          if (!token) throw new UnauthorizedException('Missing token');

          let payload: any;
          const secret = process.env.JWT_SECRET
          if (!secret) throw new Error('SECRET NOT FOUND')
          payload = jwt.verify(token, secret);
          return payload;
      } catch (error) {
          throw new UnauthorizedException('Invalid token');            
      }
  }

  @ApiExtraModels(ApiResponse, CreateTasksDto)
  @ApiOkResponse({
    description: 'Successful Creation of Task',
    schema: {
        allOf: [
        { $ref: getSchemaPath(ApiResponse) },
        {
            properties: {
            data: { $ref: getSchemaPath(CreateTasksDto) },
            },
        },
        ],
    },
  })
  @HttpCode(201)
  @ApiUnauthorizedResponse({ description: 'Unauthorized - JWT is invalid or missing' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(@Body() dto: CreateTasksDto, @Req() request: Request) {
    const token = request.cookies['access_token'];
    const payload = this.verifyToken(token)
    const userId = payload.userId as string;
    const response = await this.taskService.createTask(dto, userId);
    return ApiResponse.created(response);
  }

  @ApiExtraModels(ApiResponse, CreateTasksDto)
  @ApiOkResponse({
    description: 'Task list retrieved successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(CreateTasksDto) },
          },
        },
      ],
    },
  })
  @ApiUnauthorizedResponse({description: 'Unauthorized - JWT is missing or invalid'})
  @UseGuards(JwtAuthGuard)
  @Get()
  async getListTasks(@Req() request: Request) {
    const token = request.cookies['access_token'];
    const payload = this.verifyToken(token)
    const userId = payload.userId as string;
    return await this.taskService.getListTasks(userId);
  }
  @ApiExtraModels(ApiResponse, CreateTasksDto)
  @ApiOkResponse({
    description: 'Task updated successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(CreateTasksDto) },
          },
        },
      ],
    },
  })
  @ApiUnauthorizedResponse({description: 'Unauthorized - JWT is missing or invalid'})
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() dto: CreateTasksDto,
    @Req() request: Request,
  ) {
    const token = request.cookies['access_token'];
    const payload = this.verifyToken(token)
    const userId = payload.userId as string;
    return await this.taskService.updateTask(id, dto, userId);
  }

  @ApiOkResponse({
    description: 'Task deleted successfully',
    example: "Resource deleted"
  })
  @ApiUnauthorizedResponse({description: 'Unauthorized - JWT is missing or invalid'})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTask(@Param('id') id: string, @Req() request: Request) {
    const token = request.cookies['access_token'];
        const payload = this.verifyToken(token)
        const userId = payload.userId as string;
        await this.taskService.deleteTask(id,userId);
        return ApiResponse.deleted()
    }
}
