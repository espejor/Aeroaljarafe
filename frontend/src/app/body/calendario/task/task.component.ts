import { Component, OnInit, Input } from "@angular/core";
import { CalendarioService } from "../calendario.service";
import { User } from "src/app/user/user.model";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  private _cursor: string = "auto";
  private _top: number;
  private _dragging: boolean = false;
  previousTop: number;

  private buttonStyle = new Object()

  @Input() id: string = `${this.plane}_${this.hour}`;
  @Input() day: Date;
  @Input() user: User;
  previousId: string;

  @Input() public get top(): number {
    return this._top;
  }
  public set top(value: number) {
    this._top = value;
    this._hour = this.calculateHour(value);
    if (this.plane != undefined) this.id = `${this.plane}_${this.hour}`;
    this.buttonStyle["top.rem"] = value;
  }


  @Input() public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._heightRsz = 1.5;
    this._topRsz = -value + 2 * this.heightRsz;
    this._height = value;
    this.tVuelo = this.calculateTVuelo();
    this.buttonStyle["height.rem"] = value;
  }
  @Input() public get hour(): string {
    return this._hour;
  }
  public set hour(value: string) {
    this._hour = value;
    if (this.plane != undefined) this.id = `${this.plane}_${this.hour}`;
    this._top = this.calculateTop(this.hour);
  }
  @Input() public get plane(): string {
    return this._plane;
  }

  public set plane(value: string) {
    this._plane = value;
    if (this.hour != undefined) this.id = `${this.plane}_${this.hour}`;
  }

  // ----------- Constructor ---------------
  constructor(private calendarioService: CalendarioService,private modalService: NgbModal) {
    this.height = 2;
  }

  ngOnInit() {
    this.id = `${this.plane}_${this.hour}`;

    // this.top = this.task.top;
    this.cursor = "auto";
    this.buttonStyle = {
      "height.rem": this.height,
      "top.rem": this.top,
      "cursor": this.cursor,
      "z-index": 10
    };
  }

  // ------------ Setter y Getter -------------

  public get dragging(): boolean {
    return this._dragging;
  }
  public set dragging(value: boolean) {
    if (value) this.buttonStyle["z-index"] = 100;
    else this.buttonStyle["z-index"] = 10;
    this._dragging = value;
  }
  public get cursor(): string {
    return this._cursor;
  }
  public set cursor(value: string) {
    this._cursor = value;
    this.buttonStyle["cursor"] = value;
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

  calculateTop(hour: string): number {
    let hourArray = hour.split(":");
    let h = parseInt(hourArray[0]);
    let m = parseInt(hourArray[1]);
    return 4 * h + (2 * m) / 30;
  }

  calculateHour(value: number): string {
    let min = value * 15;
    let h = Math.trunc(min / 60);
    let m = Math.trunc(min % 60);
    let hStr: string = h.toString();
    if (h < 10) hStr = `0${hStr}`;
    let mStr: string = m.toString();
    if (m < 10) mStr = `0${mStr}`;

    return `${hStr}:${mStr}`;
  }
  // ------------- Handlers de ratón
  mouseDownEvent(event) {
    if (event.target.classList.contains("resizingArea")) {
      this.calendarioService.resizing = true;
      if (this.calendarioService.taskResizing == undefined)
        this.calendarioService.taskResizing = this
      this.calendarioService.taskResizing = this;
    }
    if (this.clickInButton(event)) {
      this.calendarioService.moving = true;
      this.dragging = true;
      this.cursor = "move";
      this.calendarioService.taskMoving = this;
      this.previousTop = this.top;
      this.previousId = this.id;
    }
  }

  private clickInButton(event: any): any {
    return (
      event.target.classList.contains("buttonTask") ||
      event.target.classList.contains("hour") ||
      event.target.classList.contains("tVuelo") ||
      event.target.classList.contains("actions")
    );
  }

  mouseMoveEvent(event) {
    if (this.calendarioService.moving && this.dragging) {
      let shiftUnit = this.calendarioService.HEIGHT_CALENDAR / 48;
      let shiftREM = (event.movementY * 2) / shiftUnit;
      this.top += shiftREM;
      this.buttonStyle["cursor"] = "move";
    }
  }

  mouseUpEvent(event) {
    if (this.calendarioService.moving) {
      let topTrunc = Math.trunc(this.top);
      this.top = topTrunc % 2 != 0 ? Math.floor(topTrunc / 2) * 2 : topTrunc;

      this.dragging = false;
      this.calendarioService.moving = false;
      this.cursor = "auto";
      if (this.top != this.previousTop) {
        // this.onDblClickEvent(event)
      // } else {
        if (!this.calendarioService.isOcupied(this)) {
          this.calendarioService.updateTask(this.previousId, this);
        } else {
          this.top = this.previousTop;
        }
      }
    }
    if (this.calendarioService.resizing || this.calendarioService.creating) {
      this.calendarioService.resizing = false;
      this.calendarioService.creating = false;
      this.calendarioService.updateTask(this.id, this);
    }
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

    
  showModal(template){
    this.modalService.open(template);
  }



  onDblClickEvent(event,template) {
    this.showModal(template)
  }
}
