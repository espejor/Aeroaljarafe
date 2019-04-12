import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  Type,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver
} from "@angular/core";
import { CalendarioService } from "./calendario.service";
import { TaskComponent } from "./task/task.component";
import { Observable } from "rxjs";
import { User } from "src/app/user/user.model";

@Component({
  selector: "app-calendario",
  templateUrl: "./calendario.component.html",
  styleUrls: ["./calendario.component.css"]
})
export class CalendarioComponent implements OnInit, AfterViewInit {
  @ViewChildren(TaskComponent) tasks: QueryList<TaskComponent>;
  // @ViewChild("tareas", { read: ViewContainerRef }) tareas: ViewContainerRef;
  private componentRef: ComponentRef<TaskComponent>;

  planeList: any[] = [{ id: "aaaaa" }, { id: "bbbbb" }];
  day: Date = new Date();
  hourList: string[] = [];
  // taskResizing: TaskComponent;
  user: User;

  tasksList$: Observable<Map<string, TaskComponent>>;
  tasksList: Map<string, TaskComponent>// = new Map<string, TaskComponent>();
  showDatePicker: boolean = false;

  ngOnInit() {
    this.createHourList();
    this.tasksList$ = this.calendarioService.getTasksList$();
    this.tasksList$.subscribe(tasksList => {
      this.tasksList = tasksList;
    });
  }

  constructor(
    private viewContainerRef:ViewContainerRef,
    private calendarioService: CalendarioService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  createTaskComponent(ngItem: Type<TaskComponent>): TaskComponent {
    this.viewContainerRef.clear();
    let factory = this.componentFactoryResolver.resolveComponentFactory(ngItem)
    this.componentRef = this.viewContainerRef.createComponent(factory);
    let newTask: TaskComponent = this.componentRef.instance;
    this.componentRef.destroy()
    return newTask
  }

  createDummyTasks(): any {
    // Creación de dos tareas
    let task1 = this.createTaskComponent(TaskComponent);
    task1.hour = "10:30";
    task1.plane = "aaaaa";
    task1.height = 4;
    task1.top = 42;
    this.calendarioService.addTask(task1);
    let task2 = this.createTaskComponent(TaskComponent);
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
    // this.createDummyTasks();
  }

  mouseDownEvent(event) {
    this.calendarioService.HEIGHT_CALENDAR = event.currentTarget.clientHeight;
    if (event.target.classList.contains("cell")) {
      if (!this.calendarioService.resizing) {
        this.calendarioService.creating = true;
        this.calendarioService.taskResizing = this.createtask(event);
      }
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
    let task: TaskComponent = this.createTaskComponent(TaskComponent);
    task.hour = event.target.attributes.hour.value;
    task.plane = event.target.attributes.plane.value;
    this.calendarioService.addTask(task);
    return task;
  }

  mouseUpEvent(event) {
    if (this.calendarioService.moving) {
      this.calendarioService.taskMoving.mouseUpEvent(event);
    }
    if (this.calendarioService.resizing || this.calendarioService.creating) {
      this.calendarioService.taskResizing.mouseUpEvent(event);
    }
  }

  clickEvent(event) {
    this.showDatePicker = true;
  }
}
