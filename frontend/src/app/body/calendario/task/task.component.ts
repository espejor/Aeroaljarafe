import { Component, OnInit, Input } from "@angular/core";
import { CalendarioService } from "../calendario.service";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"]
})
export class TaskComponent implements OnInit {
  private _hour: string;
  private _plane: string;
  private _height: number;
  private _heightRsz: number;
  private _topRsz: number;
  private _tVuelo: number;

  @Input() top: number;
  @Input() id: string = `${this.plane}_${this.hour}`;
  @Input() task: TaskComponent;
  @Input() public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._heightRsz = 1.5;
    this._topRsz = -value + 2 * this.heightRsz;
    this._height = value;
    this.tVuelo = this.calculateTVuelo();
  }
  @Input() public get hour(): string {
    return this._hour;
  }
  public set hour(value: string) {
    this._hour = value;
    if (this.plane != undefined) this.id = `${this.plane}_${this.hour}`;
  }
  @Input() public get plane(): string {
    return this._plane;
  }
  public set plane(value: string) {
    this._plane = value;
    if (this.hour != undefined) this.id = `${this.plane}_${this.hour}`;
  }

  public get heightRsz(): number {
    return this._heightRsz;
  }
  public set heightRsz(value: number) {
    this._heightRsz = value;
  }
  // top:number

  public get tVuelo(): number {
    return this._tVuelo;
  }
  public set tVuelo(value: number) {
    this._tVuelo = value;
  }
  private calculateTVuelo(): number {
    return this.height * 15;
  }
  constructor(private calendarioService: CalendarioService) {}

  ngOnInit() {
    this.id = `${this.plane}_${this.hour}`;
    console.log(this.task);
    this.top = this.task.top;
  }

  mouseDownEvent(event) {
    //this.calendarioService.HEIGHT_CALENDAR = event.target.clientHeight;
    this.calendarioService.resizing = true;
    this.calendarioService.taskResizing = this.task;
  }

  mouseEnterEvent(event) {
    // if (this.calendarioService.resizing || this.calendarioService.creating) {
    //   if (
    //     event.movementY > 0 &&
    //     event.target.classList.contains("buttonTask")
    //   ) {
    //     this.calendarioService.resizing = false;
    //     this.calendarioService.creating = false;
    //   }
    // }
  }
  mouseLeaveEvent(event) {
    if (this.calendarioService.resizing || this.calendarioService.creating) {
      if (event.movementY > 0) {
        // Creciendo
        if (event.toElement.classList.contains("cell"))
          this.calendarioService.taskResizing.height += 2;
        else {
          this.calendarioService.resizing = false;
          this.calendarioService.creating = false;
        }
      } else {
        // Decreciendo
        if (
          event.target.classList.contains("resizingArea") &&
          this.calendarioService.taskResizing.height > 2
        )
          this.calendarioService.taskResizing.height -= 2;
        else {
          this.calendarioService.resizing = false;
          this.calendarioService.creating = false;
        }
      }
    }
  }
}
