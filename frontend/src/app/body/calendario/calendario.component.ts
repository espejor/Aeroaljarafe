import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  Renderer2
} from "@angular/core";
import { ButtonComponent } from "./row/segment/button/button.component";
import { CalendarioService } from "./calendario.service";
import { TaskComponent } from "./task/task.component";
import { Tasks } from "./tasksList";

@Component({
  selector: "app-calendario",
  templateUrl: "./calendario.component.html",
  styleUrls: ["./calendario.component.css"]
})
export class CalendarioComponent implements OnInit, AfterViewInit {
  @ViewChildren(TaskComponent) tasks: QueryList<TaskComponent>;
  tasksList: TaskComponent[] = [];
  planeList: any[] = [{ id: "aaaaa" }, { id: "bbbbb" }];
  hourList: string[] = [];
  taskResizing: TaskComponent;

  constructor(
    private calendarioService: CalendarioService,
    private renderer: Renderer2
  ) {
    this.tasksList = [];
    let task1 = new TaskComponent(this.calendarioService);
    task1.hour = "10:30";
    task1.plane = "aaaaa";
    task1.height = 4;
    task1.top = 42;
    this.tasksList.push(task1);
    let task2 = new TaskComponent(this.calendarioService);
    task2.hour = "07:00";
    task2.plane = "bbbbb";
    task2.height = 6;
    task2.top = 28;
    this.tasksList.push(task2);

    this.createHourList();
  }

  ngAfterViewInit(): void {
    this.tasks.changes.subscribe((tasks: TaskComponent[]) => {
      // tasks.forEach((task: TaskComponent) =>
      //   console.log(`${task.hour}_${task.plane}`)
      // );
    });
  }

  ngOnInit() {}

  mouseDownEvent(event) {
    this.calendarioService.HEIGHT_CALENDAR = event.target.clientHeight;
    if (!this.calendarioService.resizing) {
      this.calendarioService.creating = true;
      this.calendarioService.taskResizing = this.createtask(event);
    }
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
    task.height = 2;
    task.top = this.calculateTop(task.hour);
    this.tasksList.push(task);
    return task;
  }

  calculateTop(hour: string): number {
    let hourArray = hour.split(":");
    let h = parseInt(hourArray[0]);
    let m = parseInt(hourArray[1]);
    return 4 * h + (2 * m) / 30;
  }

  mouseUpEvent(event) {
    if (this.calendarioService.creating || this.calendarioService.resizing) {
      this.calendarioService.creating = false;
      this.calendarioService.resizing = false;

      console.log("Botón Creado");
    }
  }
}
