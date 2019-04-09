import { HtmlSchedulerHourRow } from "./rowClasses/html-scheduler-hour-row";
import { PlaneService } from '../../plane/plane.service';
import { Plane } from '../../plane/plane.model';

export class HtmlSchedulerGrid {
  private _rowsOfSegments: HtmlSchedulerHourRow[] = [];

  static SEGMENTTIMEINMINUTES: number = 30; // Número de minutos de cada bloque de tiempo del scheduler

  constructor(private planeService:PlaneService,private planes:Plane[]) {
    let rowsOfScheduler = (24 * 60) / HtmlSchedulerGrid.SEGMENTTIMEINMINUTES;
    for (let i = 0; i < rowsOfScheduler; i++) {
      let totalMin = i * HtmlSchedulerGrid.SEGMENTTIMEINMINUTES;
      this.rowsOfSegments.push(new HtmlSchedulerHourRow(totalMin,planes,planeService));
    }
  }
  public get rowsOfSegments(): HtmlSchedulerHourRow[] {
    return this._rowsOfSegments;
  }
  public set rowsOfSegments(value: HtmlSchedulerHourRow[]) {
    this._rowsOfSegments = value;
  }
  public handleMouseDownEvent(element: any) {}
}
