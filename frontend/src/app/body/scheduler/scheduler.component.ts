import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";
import { Plane } from "../plane/plane.model";
import { PlaneService } from "../plane/plane.service";
import { HtmlFlightButton } from "./classes/rowClasses/segmentClasses/clickableClasses/html-flight-button";
import { HtmlButtonElement } from "./classes/rowClasses/segmentClasses/clickableClasses/elementClasses/html-button-element";
import { HtmlSchedulerGrid } from "./classes/html-scheduler-grid";
import { HandlerMouseEvent } from "./classes/handlerEvents/handler-mouse-event";
import { HtmlSchedulerHourRow } from "./classes/rowClasses/html-scheduler-hour-row";

@Component({
  selector: "app-scheduler",
  templateUrl: "./scheduler.component.html",
  styleUrls: ["./scheduler.component.css"]
})
export class SchedulerComponent implements OnInit {
  @ViewChild("segmentOfTime") segment: ElementRef;

  planes: Plane[];

  private htmlGrid: HtmlSchedulerGrid;

  private handlerMouseEvent: HandlerMouseEvent;

  private htmlFlightButtons: HtmlFlightButton[] = [];

  private rowOfSegments: HtmlSchedulerHourRow[] = [];

  constructor(private renderer: Renderer2, private planeService: PlaneService) {
    this.getPlanes();
  }

  ngOnInit() {}

  private getPlanes() {
    this.planeService.getPlanes().subscribe(data => {
      this.planes = data.planes;
      this.htmlGrid = new HtmlSchedulerGrid(this.planeService, this.planes);
      this.handlerMouseEvent = new HandlerMouseEvent(
        this.htmlGrid,
        this.renderer
      );
      this.rowOfSegments = this.htmlGrid.rowsOfSegments;
    });
  }

  mouseDownEvent(element) {
    this.handlerMouseEvent.mouseDownEvent(element);
  }

  enlargingButtonFlight(event) {
    this.handlerMouseEvent.enlargingButtonFlight(event);
  }

  endCreatingButtonFlight(element) {
    this.handlerMouseEvent.endCreatingButtonFlight(element);
  }

  moveButtonFlight(element) {
    console.log(element);
  }

  editFlight(element: HtmlButtonElement) {
    console.log(element);
  }
}
