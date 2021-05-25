import { Controller, Get, Post, Body } from '@nestjs/common';
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
       @Body('title') title:string,
       @Body('description') description:string
    ):Task {
        // console.log('title:',title);
        // console.log('description:',description);
        return this.tasksService.createTask(title,description);
    }
}
