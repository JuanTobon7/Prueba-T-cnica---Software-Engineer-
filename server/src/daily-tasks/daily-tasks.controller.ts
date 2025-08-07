import { BadRequestException, Body, Controller, HttpCode, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { DailyTasksService } from './daily-tasks.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiResponse } from 'src/common/res/dto/api-response.dto';
import { DailyTasksDto } from './dto/req/daily-task.dto';
import { JwtAuthGuard } from 'src/common/conf/jwt.guard';

@ApiTags('Daily Tasks')
@ApiBearerAuth()
@Controller('tasks/:taskId/daily-tasks')
export class DailyTasksController {
    constructor(private readonly dailyTaskService: DailyTasksService){}
        
    @ApiExtraModels(ApiResponse,DailyTasksDto)
    @ApiOkResponse({
        description: 'Successful Creation of Task',
        schema: {
            allOf: [
            { $ref: getSchemaPath(ApiResponse)},
            {
                properties: {
                data: { $ref: getSchemaPath(DailyTasksDto)},
                },
            },
            ],
        },
    })
    @HttpCode(201)
    @ApiUnauthorizedResponse({ description: 'Unauthorized - JWT is invalid or missing' })
    @ApiBadRequestResponse({ description: 'Bad Request - Invalid input data'})
    @UseGuards(JwtAuthGuard)
    @Post()
    async updateDailyTask(@Body() dto: DailyTasksDto,@Param('taskId') taskId: string){
        if(!taskId) throw new BadRequestException('taskId is required')
        return await this.dailyTaskService.updateDailyTask(taskId,dto);
    }    
}
