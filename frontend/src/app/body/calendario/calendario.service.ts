import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { SegmentComponent } from "./row/segment/segment.component";
import { TaskComponent } from "./task/task.component";

@Injectable({
  providedIn: "root"
})
export class CalendarioService {
  private _resizing: boolean = false;
  private _creating: boolean = false;
  private _moving: boolean = false;
  private _tasksList = new Map<string, TaskComponent>();
  private tasksList$ = new Subject<Map<string, TaskComponent>>();

  listOfSegmentsWithButton: SegmentComponent[] = [];
  private _segmentResizing: SegmentComponent;
  private _segmentLeft: SegmentComponent;
  private _temporaryHeight: number;
  private _heightOfSegment: number;
  private _enlarging: boolean;
  private _shortening: boolean;
  private _enlargingBlocked: boolean = false;
  private _taskResizing: TaskComponent ;
  private _taskMoving: TaskComponent;
  HEIGHT_CALENDAR: any;

  constructor() {}

  // public get tasksList() {
  //   return this._tasksList;
  // }
  // public set tasksList(value) {
  //   this._tasksList = value;
  // }

  public updateTask(oldTask:TaskComponent,newTask:TaskComponent){
    this._tasksList.delete(oldTask.id);
    this._tasksList.set(newTask.id, newTask);
    this.tasksList$.next(this._tasksList);
  }

  public addTask(task: TaskComponent) {
    this._tasksList.set(task.id, task);
    this.tasksList$.next(this._tasksList);
  }

  public removeTask(task: TaskComponent) {
    this._tasksList.delete(task.id);
    this.tasksList$.next(this._tasksList);
  }

  public getTask(key: string): TaskComponent {
    return this._tasksList.get(key);
  }

  public getTasksList$(): Observable<Map<string, TaskComponent>> {
    return this.tasksList$.asObservable();
  }

  public isOcupied(_task: TaskComponent): boolean {
    let init = _task.top;
    let end = _task.top + _task.height;
    let plane = _task.plane;
    let ocupied = false;
    this._tasksList.forEach((task, key, list) => {
      if (task.id != _task.getTask().id && !ocupied && plane == task.plane) {
        if (init >= task.top) {
          if (init < task.top + task.height) 
          ocupied = true; // Empieza en medio de otra tarea
        } //init < task.top
        else if (end > task.top) ocupied = true;
      }
    });
    return ocupied;
  }

  public get moving(): boolean {
    return this._moving;
  }
  public set moving(value: boolean) {
    this._moving = value;
  }
  public get taskMoving(): TaskComponent {
    return this._taskMoving;
  }
  public set taskMoving(value: TaskComponent) {
    this._taskMoving = value;
  }
  public get enlargingBlocked(): boolean {
    return this._enlargingBlocked;
  }
  public set enlargingBlocked(value: boolean) {
    this._enlargingBlocked = value;
  }

  public get shortening(): boolean {
    return this._shortening;
  }
  public set shortening(value: boolean) {
    this._shortening = value;
  }
  public get enlarging(): boolean {
    return this._enlarging;
  }
  public set enlarging(value: boolean) {
    this._enlarging = value;
  }
  public get heightOfSegment(): any {
    return this._heightOfSegment;
  }
  public set heightOfSegment(value: any) {
    this._heightOfSegment = value;
  }
  public get temporaryHeight(): number {
    return this._temporaryHeight;
  }
  public set temporaryHeight(value: number) {
    this._temporaryHeight = value;
  }

  public get creating(): boolean {
    return this._creating;
  }
  public set creating(value: boolean) {
    this._creating = value;
  }
  public get resizing(): boolean {
    return this._resizing;
  }
  public set resizing(value: boolean) {
    this._resizing = value;
  }

  public get segmentLeft(): SegmentComponent {
    return this._segmentLeft;
  }
  public set segmentLeft(value: SegmentComponent) {
    this._segmentLeft = value;
  }
  public get segmentResizing(): SegmentComponent {
    return this._segmentResizing;
  }
  public set segmentResizing(value: SegmentComponent) {
    this._segmentResizing = value;
  }

  public setSegmentResizing(key: string) {
    this._segmentResizing = this.listOfSegmentsWithButton[key];
  }
  public get taskResizing(): TaskComponent {
    return this._taskResizing;
  }
  public set taskResizing(value: TaskComponent) {
    this._taskResizing = value;
  }
}
