import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTasksDto } from './dto/create-tasks/create-tasks.decorator';
import { Task } from '@prisma/client';
import { StatusTaskEnum } from './enum/status-task/status-task.decorator';

@Injectable()
export class TasksService {
    constructor(private readonly prismaService: PrismaService){}

    async createTask(dto: CreateTasksDto, userId: string): Promise<Task>{
        if(!userId) throw new NotFoundException('User Id is required')
        const task = await this.prismaService.task.create({
            data: {
                userId: userId,
                title: dto.title,
                description: dto.description,
                status: dto.status || StatusTaskEnum.PENDING,
                createdAt: dto.createdAt,
                updatedAt: dto.updatedAt
            }
        });
        return task;
    }

    async getListTasks(userId: string): Promise<Task[]>{
        if(!userId) throw new NotFoundException('User Id is required');
        const tasks = await this.prismaService.task.findMany({
            where: {userId: userId},
            orderBy: {createdAt: 'desc'}
        })
        if(!tasks || tasks.length === 0) throw new NotFoundException('No tasks found for this user');
        return tasks;
    }

    async updateTask(id: string, dto: CreateTasksDto, userId: string): Promise<Task>{
        if(!userId) throw new NotFoundException('User Id is required');
        const task = await this.prismaService.task.findUnique({where: {id: id, userId: userId}});
        if(!task) throw new NotFoundException(`Task with ID ${id} not found for user ${userId}`);
        
        const updatedTask = await this.prismaService.task.update({
            where: {id: id},
            data: {
                title: dto.title,
                description: dto.description,
                status: dto.status || task.status,
                updatedAt: new Date()
            }
        });
        return updatedTask;
    }

    async deleteTask(id: string): Promise<void>{
        if(!id) throw new NotFoundException('Task Id is required');
        const task = await this.prismaService.task.findUnique({where: {id:id}});
        if(!task) throw new NotFoundException(`Task with Id ${id} not found`)
        await this.prismaService.task.delete({where: {id: id}})
        return;
    }
}
