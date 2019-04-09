import { ElementRef, Renderer2 } from "@angular/core";
import { HtmlSchedulerSegment } from "../../html-scheduler-segment";
import { HtmlSchedulerHourRow } from "../../../html-scheduler-hour-row";
import { HtmlSchedulerGrid } from "../../../../html-scheduler-grid";
import { HtmlFlightButton } from "../html-flight-button";

export class HtmlButtonElement extends ElementRef {
  private hour: string;
  private plane: string;
  private height: number;

  constructor(
    type: string,
    button: HtmlFlightButton,
    parent: HtmlSchedulerSegment,
    private renderer: Renderer2
  ) {
    super(type);
    this.hour = button.start;
    this.plane = button.plane;
    this.height = button.height;

  }

}
