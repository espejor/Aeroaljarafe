import { HtmlSchedulerTimeSegment } from "./segmentClasses/html-scheduler-time-segment";
import { HtmlSchedulerSegment } from "./segmentClasses/html-scheduler-segment";
import { PlaneService } from "src/app/body/plane/plane.service";
import { Plane } from "src/app/body/plane/plane.model";

export class HtmlSchedulerHourRow {
  private _segmentHour: HtmlSchedulerTimeSegment;
  private _segmentsScheduler: HtmlSchedulerSegment[] = [];

  private _planes: Plane[];

  static HEIGHTSEGMENT: number = 2; // Altura en "rem" que tendrá el segment

  constructor(hour: number,planes:Plane[], private planeService: PlaneService) {
    // esta llamada es asíncrona por lo que la hacemos primero y
    // cuando reciba los datos se ejecuta la creación de las subclases
    this.planes = planes;
    this.segmentHour = new HtmlSchedulerTimeSegment("DIV", hour);
    for (let i = 0; i < this.planes.length; i++) {
        this.segmentsScheduler.push(
          new HtmlSchedulerSegment(
            "DIV",
            this.segmentHour.label,
            this.planes[i]._id
          )
        );
      }
  }


  public get segmentsScheduler(): HtmlSchedulerSegment[] {
    return this._segmentsScheduler;
  }
  public set segmentsScheduler(value: HtmlSchedulerSegment[]) {
    this._segmentsScheduler = value;
  }
  public get segmentHour(): HtmlSchedulerTimeSegment {
    return this._segmentHour;
  }
  public set segmentHour(value: HtmlSchedulerTimeSegment) {
    this._segmentHour = value;
  }
  public get planes(): Plane[] {
    return this._planes;
  }
  public set planes(value: Plane[]) {
    this._planes = value;
  }
}
