import { TaskStatus } from "../tasks.model";

export class FilterTaskDTO{
    status?: TaskStatus;
    search?: string
}