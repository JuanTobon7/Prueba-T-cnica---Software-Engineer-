import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTasksDto } from './dto/create-tasks/create-tasks.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiResponse } from 'src/common/res/dto/api-response.dto';
import { TasksService } from './tasks.service';

@Controller('tasks/:userId')
export class TasksController {

    constructor(private readonly taskService: TasksService){}

    @ApiOkResponse({
        description: 'Task created successfully',
        type: ApiResponse
    })
    @Post()
    async createTask(
        @Param('userId') userId: string,@Body() dto: CreateTasksDto){
        return this.taskService.createTask(dto,userId)
    }
    @ApiOkResponse({
        description: 'List of tasks retrieved successfully',
        type: ApiResponse
    })
    @Get()
    async getListTasks(@Param('userId') userId: string){
        return this.taskService.getListTasks(userId);
    }
    @ApiOkResponse({
        description: 'Task updated successfully',
        type: ApiResponse
    })
    @Put(':id')
    async updateTask(@Param('id') id: string, @Param('userId') userId: string, @Body() dto: CreateTasksDto){
        return this.taskService.updateTask(id,dto,userId)
    }
    @ApiOkResponse({
        description: 'Task deleted successfully',
        type: ApiResponse
    })
    @Delete(':id')
    async deleteTask(@Param('id') id: string){
        return 'Task deleted successfully'
    }
}