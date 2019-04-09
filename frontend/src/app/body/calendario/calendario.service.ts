import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HtmlButton } from "./row/segment/button/htmlButton";
import { SegmentComponent } from "./row/segment/segment.component";
import { ButtonComponent } from "./row/segment/button/button.component";
import { TaskComponent } from './task/task.component';

@Injectable({
  providedIn: "root"
})
export class CalendarioService {
  private _resizing: boolean = false;
  private _creating: boolean = false;

  listOfSegmentsWithButton: SegmentComponent[] = [];
  private _segmentResizing: SegmentComponent;
  private _segmentLeft: SegmentComponent;
  private _temporaryHeight: number;
  private _heightOfSegment: number;
  private _enlarging: boolean;
  private _shortening: boolean;
  private _enlargingBlocked: boolean = false;
  private _taskResizing: TaskComponent;
  HEIGHT_CALENDAR: any;

  constructor() {}

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
