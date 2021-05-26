import { TaskStatus } from "../tasks.model";

export class UpdateTaskDTO{
    id:string;
    title: string;
    description: string;
    status: TaskStatus;
}