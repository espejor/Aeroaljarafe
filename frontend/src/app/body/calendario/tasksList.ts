import { TaskComponent } from "./task/task.component";
import { CalendarioService } from './calendario.service';

export class Tasks{
    static tasks: TaskComponent[] = [];
    constructor(private calendarioService:CalendarioService){
        let task1 = new TaskComponent(this.calendarioService)
        task1.hour = "10:30";
        task1.plane = "aaaaaaaaaaa";
        task1.height = 4;
        Tasks.tasks[0] = task1;
        let task2 = new TaskComponent(this.calendarioService)
        task2.hour = "13:00";
        task2.plane = "bbbbbbbbbbb";
        task2.height = 6;
        Tasks.tasks[1] = task2;
    }
}