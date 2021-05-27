import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getAllTasks() : Task[]{
  //      return this.tasksService.getAllTasks();
  // }

  @Get()
  getTasks(@Query() filterDto: FilterTaskDTO): Task[] {
    if (Object.keys(filterDto).length > 0) {
      return this.tasksService.getTasksWithFilter(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Task[] {
    return this.tasksService.deleteTaskById(id);
  }

  @Put('/:id')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ): Task {
    return this.tasksService.updateTaskById(updateTaskDTO, id);
  }

  @Put('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Post()
  createTask(
    //    @Body('title') title:string,
    //    @Body('description') description:string
    @Body() CreateTaskDTO: CreateTaskDTO,
    @Param('id') id: string,
  ): Task {
    // console.log('title:',title);
    // console.log('description:',description);
    return this.tasksService.createTask(
      // title,description
      CreateTaskDTO,
    );
  }
}
