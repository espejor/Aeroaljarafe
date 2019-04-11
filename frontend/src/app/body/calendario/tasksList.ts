import { TaskComponent } from "./task/task.component";
import { CalendarioService } from './calendario.service';

export class Task{
    task: TaskComponent
    constructor(task:TaskComponent){
        this.task = task;
    }
}
