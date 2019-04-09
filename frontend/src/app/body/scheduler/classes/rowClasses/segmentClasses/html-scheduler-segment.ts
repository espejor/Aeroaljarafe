import { IhtmlSchedulerSegment } from "../../../interfaces/ihtml-scheduler-segment";
import { ElementRef } from "@angular/core";

export class HtmlSchedulerSegment extends ElementRef
  implements IhtmlSchedulerSegment {
  private _date: Date;
  private _hour: string;
  private _plane: string;

  private _ocupied: boolean = false;

  constructor(type: string,hour?:string,plane?: string) {
    super(type);
    this._hour = hour;
    this._plane= plane;
  }

  public get ocupied(): boolean {
    return this._ocupied;
  }
  public set ocupied(value: boolean) {
    this._ocupied = value;
  }

  public get date(): Date {
    return this._date;
  }
  public set date(value: Date) {
    this._date = value;
  }
  public get hour(): string {
    return this._hour;
  }
  public set hour(value: string) {
    this._hour = value;
  }
  public get plane(): string {
    return this._plane;
  }
  public set plane(value: string) {
    this._plane = value;
  }
}
