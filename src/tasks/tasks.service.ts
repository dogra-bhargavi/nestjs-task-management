import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { FilterTaskDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskById(id: string): Task {
    // console.log("**********id service*******",id);
    return this.tasks.find((task) => task.id === id);
  }
  getTasksWithFilter(filterDto: FilterTaskDTO): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    // console.log("**********TASKS service*******",tasks);
    return tasks;
  }

  deleteTaskById(id: string): Task[] {
    return this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    let task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  updateTaskById(updateTaskDTO: UpdateTaskDTO, id: string): Task {
    const { title, description, status } = updateTaskDTO;
    let taask: Task = {
      id: uuid(),
      title: '',
      description: '',
      status: TaskStatus.OPEN,
    };
    this.tasks.forEach((task) => {
      if (task.id === id) {
        taask.id = task.id;
        taask.status = task.status;
        if (title !== undefined) task.title = title;

        if (description !== undefined) task.description = description;
        taask = task;
      }
    });
    //    console.log("**********",this.tasks);
    return taask;
  }

  createTask(CreateTaskDTO: CreateTaskDTO): Task {
    const { title, description } = CreateTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
