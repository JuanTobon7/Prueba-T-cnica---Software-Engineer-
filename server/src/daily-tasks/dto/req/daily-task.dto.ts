import { IsDate, IsEnum, IsISO8601, IsNotEmpty } from "class-validator";
import { StatusTaskEnum } from "../enum/status-task/status-task.decorator"; 
import { ApiProperty } from "@nestjs/swagger";

export class DailyTasksDto {
    @IsEnum(StatusTaskEnum, {message: `Status must be a valid status (${Object.values(StatusTaskEnum).join(', ')})`})
    @IsNotEmpty({message: 'Last name is required'})
    @ApiProperty({enum: StatusTaskEnum, default: StatusTaskEnum.PENDING, description: 'Status of the task',example: StatusTaskEnum.PENDING})
    status: StatusTaskEnum = StatusTaskEnum.PENDING;
    @IsNotEmpty({message: 'Date is required'})
    @IsISO8601({strict: true}, {message: 'Date must be a valid ISO 8601 date'})
    @ApiProperty({type: String, format: 'date-time', example: '2025-12-31', description: 'Date of the task in ISO 8601 format'})
    date: string
}