import { BadRequestException, Injectable } from '@nestjs/common';
import { DailyTask } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { DailyTasksDto } from './dto/req/daily-task.dto'; 

@Injectable()
export class DailyTasksService {
    constructor(private readonly prismaService: PrismaService){}

    private async existsDailyTask(taskId: string, date: Date): Promise<DailyTask | null>{
        try {
          return await this.prismaService.dailyTask.findFirst({
                where: {
                    taskId: taskId,
                    date: date
                }
            })        
        } catch (error) {
            return null;
        }
    }

    private async updateTask(id: string, taskId: string, dailyNew: DailyTasksDto): Promise<DailyTask>{
        return await this.prismaService.dailyTask.update({
            where: {taskId: taskId, date: new Date(dailyNew.date), id: id},
            data: {
                status: dailyNew.status
            }

        })
    }

    async updateDailyTask(taskId: string, dailyNew: DailyTasksDto): Promise<DailyTask>{
        if(!taskId) throw new BadRequestException('taskId is required');
        try {
            const existingDailyTask = await this.existsDailyTask(taskId,new Date(dailyNew.date))
            if(existingDailyTask){
                return await this.updateTask(existingDailyTask.id,taskId, dailyNew);
            }
            return await this.prismaService.dailyTask.create({
                data: {
                    status: dailyNew.status,
                    taskId: taskId,
                    date: new Date(dailyNew.date)
                }
            });
        } catch (error) {
            throw error;
        }

    }
}
