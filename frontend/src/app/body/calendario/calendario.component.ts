import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList
} from "@angular/core";
import { CalendarioService } from "./calendario.service";
import { TaskComponent } from "./task/task.component";
import { Observable } from "rxjs";

@Component({
  selector: "app-calendario",
  templateUrl: "./calendario.component.html",
  styleUrls: ["./calendario.component.css"]
})
export class CalendarioComponent implements OnInit, AfterViewInit {
  @ViewChildren(TaskComponent) tasks: QueryList<TaskComponent>;

  planeList: any[] = [{ id: "aaaaa" }, { id: "bbbbb" }];
  hourList: string[] = [];
  taskResizing: TaskComponent;

  tasksList$: Observable<Map<string, TaskComponent>>;
  tasksList: Map<string, TaskComponent> = new Map<string, TaskComponent>();

  ngOnInit() {
    this.tasksList$ = this.calendarioService.getTasksList$();
    this.tasksList$.subscribe(tasksList => {
      this.tasksList = tasksList;
    });
  }

  constructor(private calendarioService: CalendarioService) {
    this.createHourList();
    this.createDummyTasks();
  }

  createDummyTasks(): any {
    // Creación de dos tareas
    let task1 = new TaskComponent(this.calendarioService);
    task1.hour = "10:30";
    task1.plane = "aaaaa";
    task1.height = 4;
    task1.top = 42;
    this.calendarioService.addTask(task1);
    let task2 = new TaskComponent(this.calendarioService);
    task2.hour = "07:00";
    task2.plane = "bbbbb";
    task2.height = 6;
    task2.top = 28;
    this.calendarioService.addTask(task2);
    this.tasksList.set(task1.id, task1);
    this.tasksList.set(task2.id, task2);
  }

  ngAfterViewInit(): void {
    this.tasks.changes.subscribe((tasks: TaskComponent[]) => {
      // tasks.forEach((task: TaskComponent) =>
      //   console.log(`${task.hour}_${task.plane}`)
      // );
    });
  }

  mouseDownEvent(event) {
    this.calendarioService.HEIGHT_CALENDAR = event.currentTarget.clientHeight;
    if (event.target.classList.contains("cell")) {
      if (!this.calendarioService.resizing) {
        this.calendarioService.creating = true;
        this.calendarioService.taskResizing = this.createtask(event);
      }
    }
    // if (this.clickInButton(event)) {
    //   this.calendarioService.moving = true;
    //   this.calendarioService.taskMoving = this.locateTask(event.target);
    //   this.calendarioService.taskMoving.cursor = "move"
    // }
  }
  // clickInButton(event: any): any {
  //   return (
  //     event.target.classList.contains("buttonTask") ||
  //     event.target.classList.contains("hour") ||
  //     event.target.classList.contains("tVuelo")
  //   );
  // }
  locateTask(target: any): TaskComponent {
    return this.calendarioService.getTask(target.id).task;
  }
  createHourList(): any {
    for (let i = 0; i < 48; i++) {
      let h = Math.trunc(i / 2);
      let hStr: string = h.toString();
      if (h < 10) hStr = `0${hStr}`;
      let m = (i % 2) * 30;
      let mStr: string = m.toString();
      if (m == 0) mStr = "00";

      this.hourList[i] = `${hStr}:${mStr}`;
    }
  }

  createtask(event: any): TaskComponent {
    let task: TaskComponent = new TaskComponent(this.calendarioService);
    task.hour = event.target.attributes.hour.value;
    task.plane = event.target.attributes.plane.value;
    this.calendarioService.addTask(task);
    return task;
  }

  mouseUpEvent(event) {
    this.calendarioService.creating = false;
    this.calendarioService.resizing = false;
    if (this.calendarioService.moving) {
      this.calendarioService.taskMoving.mouseUpEvent(event);
      // this.calendarioService.moving = false;
      // this.calendarioService.taskMoving.cursor = "auto";
      // this.calendarioService.taskMoving.dragging = false;
    }
  }

  getKeys(map) {
    return Array.from(map.keys());
  }
}
