import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService){}

    @Get()
    getAllTasks() : Task[]{
         return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(
    //    @Body('title') title:string,
    //    @Body('description') description:string
    @Body() CreateTaskDTO :CreateTaskDTO
    ):Task {
        // console.log('title:',title);
        // console.log('description:',description);
        return this.tasksService.createTask(
            // title,description
            CreateTaskDTO
            );
    }
}
