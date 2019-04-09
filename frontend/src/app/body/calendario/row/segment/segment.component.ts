import { Component, OnInit, Input } from "@angular/core";
import { ButtonComponent } from "./button/button.component";
import { CalendarioService } from "../../calendario.service";
import { Observable } from "rxjs";
import { HtmlFlightButton } from "src/app/body/scheduler/classes/rowClasses/segmentClasses/clickableClasses/html-flight-button";
import { HtmlButton } from "./button/htmlButton";
import { forEach } from "@angular/router/src/utils/collection";

@Component({
  selector: "app-segment",
  templateUrl: "./segment.component.html",
  styleUrls: ["../../calendario.component.css"]
})
export class SegmentComponent implements OnInit {
  @Input() row;
  @Input() plane;

  private _selected: boolean = false;
  private _created: boolean = false;
  private _height: number;
  private idButtonOverSelected: string;
  // private buttonComponent: ButtonComponent;

  // private _temporaryHeight = 0;
  constructor(private calendarioService: CalendarioService) {}

  ngOnInit() {}

  mouseDownEvent(event) {
    if (!this.selected) {
      this.calendarioService.creating = true;
      this.calendarioService.enlargingBlocked = false;
      
      this.calendarioService.temporaryHeight = 0;
      this.calendarioService.heightOfSegment = event.target.clientHeight;
      this.created = true;
//      this.height = 2.1;
      let key = this.getKey();
      this.setAsSelected(key);
      this.calendarioService.listOfSegmentsWithButton[key] = this;
      this.calendarioService.setSegmentResizing(key);
    }
  }

  mouseOutEvent(event) {
    this.calendarioService.segmentLeft = this;
  }

  mouseMoveEvent(event) {
    // Si se está modificando el tamaño de un botón
    if (this.calendarioService.creating) this.creatingButton(event);
    if (this.calendarioService.resizing) this.creatingButton(event);
  }

  creatingButton(event) {
    if (this.isEnlarging(event)) {
      this.calendarioService.enlarging = true;
      this.calendarioService.shortening = false;
    } else if (this.isShortening(event)) {
      this.calendarioService.enlarging = false;
      this.calendarioService.shortening = true;
    } else {
      this.calendarioService.enlarging = false;
      this.calendarioService.shortening = false;
    }
    let segmentResizing = this.calendarioService.segmentResizing;
    segmentResizing.height += 2 * this.reduceMoveToREM(event);
    if (segmentResizing.height < 2) segmentResizing.height = 2;
    console.log(segmentResizing)
    console.log(this)
    console.log(segmentResizing.height)

    // }
    // if (this.isShortening(event)) console.log(this.reduceMoveToREM(event));
    return;

    if (event.movementY == 0 && event.movementX == 0) return;
    if (!event.fromElement.classList.contains("resizingArea"))
      if (this.divergence(event)) return;
    // Cogemos el segmento que tiene el botón que se está cambiando
    // let segmentResizing = this.calendarioService.segmentResizing;
    if (this === segmentResizing && event.movementY > 0) return;
    // Si la celda está libre para resizing
    if (this.isFreeForEnlarging()) {
      segmentResizing.height = segmentResizing.height + 2.2;
      this.setAsSelected(segmentResizing.getKey());
    } else if (this.isFreeForReducing()) {
      segmentResizing.height = segmentResizing.height - 2.2;
      this.calendarioService.segmentLeft.selected = false;
    }
  }
  private reduceMoveToREM(event: any): number {
    this.calendarioService.temporaryHeight += event.movementY;
    let integer = Math.trunc(
      this.calendarioService.temporaryHeight /
        this.calendarioService.heightOfSegment
    );
    let remainder = Math.trunc(
      this.calendarioService.temporaryHeight % event.target.clientHeight
    );
    console.log(this.calendarioService.temporaryHeight);
    if (Math.abs(integer) >= 1)
      this.calendarioService.temporaryHeight = remainder;
    return integer;
  }

  private isEnlarging(event) {
    return event.movementY > 0;
  }
  private isShortening(event) {
    return event.movementY < 0;
  }

  resizingButton(event: any): any {
    if (event.movementY == 0 && event.movementX == 0) return;
    if (!event.fromElement.classList.contains("resizingArea"))
      if (this.divergence(event)) return;
    // Cogemos el segmento que tiene el botón que se está cambiando
    let segmentResizing = this.calendarioService.segmentResizing;
    if (this === segmentResizing && event.movementY > 0) return;
    // Si la celda está libre para resizing
    if (this.isFreeForEnlarging()) {
      segmentResizing.height = segmentResizing.height + 2.2;
      this.setAsSelected(segmentResizing.getKey());
    } else if (this.isFreeForReducing()) {
      segmentResizing.height = segmentResizing.height - 2.2;
      this.calendarioService.segmentLeft.selected = false;
    }
  }

  // mouseUpEvent(event) {
  //   if (this.calendarioService.creating) {
  //     this.calendarioService.creating = false;

  //     console.log("Botón Creado");
  //   }
  // }

  divergence(event): boolean {
    if (event.fromElement.id == "" || event.currentTarget.id == "") return true;
    let diffHours = this.calculateDiffBetweenSegments(
      event.fromElement.id.split("_")[1],
      event.currentTarget.id.split("_")[1]
    );
    let diffMove = event.movementY;
    if ((diffHours > 0 && diffMove < 0) || (diffHours < 0 && diffMove > 0))
      return true;
    return false;
  }

  private setAsSelected(key: string) {
    this.selected = true;
    this.idButtonOverSelected = key;
  }

  private isFreeForEnlarging() {
    return (
      !this.selected &&
      this.calendarioService.segmentResizing.plane.id == this.plane.id
    );
  }

  private isFreeForReducing() {
    return (
      this.selected &&
      this.idButtonOverSelected ==
        this.calendarioService.segmentResizing.getKey()
    );
  }

  calculateDiffBetweenSegments(segmentFrom: string, segmentTo: string): number {
    let hFrom = parseInt(segmentFrom.split(":")[0]) * 60;
    let mFrom = parseInt(segmentFrom.split(":")[1]);
    let hTo = parseInt(segmentTo.split(":")[0]) * 60;
    let mTo = parseInt(segmentTo.split(":")[1]);
    return hTo + mTo - hFrom - mFrom;
  }

  private getKey(): string {
    return `${this.row.hour}_${this.plane.id}`;
  }

  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._height = value;
  }
  public get selected(): boolean {
    return this._selected;
  }
  public set selected(value: boolean) {
    this._selected = value;
  }
  public get created(): boolean {
    return this._created;
  }
  public set created(value: boolean) {
    this._created = value;
  }
}
