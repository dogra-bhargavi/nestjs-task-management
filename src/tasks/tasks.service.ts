import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid} from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] =[];

    getAllTasks(): Task[]{
        return this.tasks;
    }
    getTaskById(id:string): Task{
        // console.log("**********id service*******",id);
        return this.tasks.find(task=>task.id===id);
    }

    createTask( CreateTaskDTO :CreateTaskDTO): Task{
        const {title,description} = CreateTaskDTO;
       const task : Task ={
          id :uuid(), 
          title,
          description,
          status: TaskStatus.OPEN,
       }
       this.tasks.push(task);
       return task;
    }
}
