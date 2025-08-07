import { Optional, SetMetadata } from '@nestjs/common';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { StatusTaskEnum } from 'src/tasks/enum/status-task/status-task.decorator';
export const CreateTasks = (...args: string[]) => SetMetadata('create-tasks', args);

export class CreateTasksDto {
    @IsNotEmpty({message: 'Title is required'})
    @IsString({message: 'Title must be a string'})
    title: string
    @IsOptional()
    @IsString({message: 'Description must be a string'})
    description: String
    @IsOptional()
    @IsEnum(StatusTaskEnum, {message: `Status must be a valid status (${Object.values(StatusTaskEnum).join(', ')})`})
    status?: String = StatusTaskEnum.PENDING
    @IsNotEmpty({message: 'User ID is required'})
    @IsUUID('4',{message: 'User ID must be a valid UUID'})
    userId: String
    @IsNotEmpty({message: 'The Date is required'})
    createdAt: Date
    @IsOptional()
    updatedAt: Date = new Date();
}