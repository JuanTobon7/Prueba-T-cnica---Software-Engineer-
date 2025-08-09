import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTasksDto } from './dto/create-tasks.decorator'; 
import { Prisma, Task } from '@prisma/client';
import { updatedTaskDto } from './dto/update-tasks.decorator';

@Injectable()
export class TasksService {
    constructor(private readonly prismaService: PrismaService){}

    async createTask(dto: CreateTasksDto, userId: string): Promise<Task>{
        if(!userId) throw new NotFoundException('User Id is required')
        console.log('dto:',dto)
        const date = new Date(dto.createdAt);
        const task = await this.prismaService.task.create({
            data: {
                userId: userId,
                title: dto.title,
                description: dto.description,
                createdAt: date,
            }
        });
        return task;
    }

    async getListTasks(userId: string, dateStr?: string, status?: string): Promise<Task[]>{
        if(!userId) throw new NotFoundException('User Id is required');
        const date = dateStr ? new Date(dateStr) : undefined;  
        const dateDaily =  dateStr ? new Date(dateStr) : undefined;
        if (date) {
            date.setUTCHours(23, 59, 59, 999);
        }        
        const tasks = await this.prismaService.task.findMany({
            where: {
                userId: userId,
                createdAt: {
                    lte: date
                },
                dailyTasks: {
                    some: {
                        status: status
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            include: {
                dailyTasks: {
                    where: {status: status, date: dateDaily}
                }                
            }
        });
        if(!tasks || tasks.length === 0) throw new NotFoundException(`No tasks found for this user in date ${dateStr}`);
        return tasks;
    }

    async updateTask(id: string, dto: updatedTaskDto, userId: string): Promise<Task>{
        if(!userId) throw new NotFoundException('User Id is required');
        const task = await this.prismaService.task.findUnique({where: {id: id, userId: userId}});
        if(!task) throw new NotFoundException(`Task with ID ${id} not found for user ${userId}`);
        
        const updatedTask = await this.prismaService.task.update({
            where: {id: id, userId: userId},
            data: {
                title: dto.title,
                description: dto.description,
            }
        });
        return updatedTask;
    }

    async deleteTask(id: string, userId: string): Promise<void>{
        if(!id) throw new NotFoundException('Task Id is required');
        console.log('id: ',id)
        const splitedId = id.split(',')
        const task = await this.prismaService.task.findMany({where: {id: {in: splitedId}, userId: userId}});
        if(!task) throw new NotFoundException(`Task with Id ${id} not found`)
        await this.prismaService.task.deleteMany({where:{
            id: {in: splitedId}
        }})
    }
}
