import { HtmlFlightButton } from "../rowClasses/segmentClasses/clickableClasses/html-flight-button";
import { HtmlSchedulerSegment } from "../rowClasses/segmentClasses/html-scheduler-segment";
import { HtmlSchedulerGrid } from "../html-scheduler-grid";
import { HtmlSchedulerHourRow } from "../rowClasses/html-scheduler-hour-row";
import { Renderer2 } from "@angular/core";

export class HandlerMouseEvent {
  resizing: boolean;
  objectResizing: HtmlFlightButton;
  htmlFlightButtons: HtmlFlightButton[] = [];
  htmlGrid: HtmlSchedulerGrid;

  constructor(grid: HtmlSchedulerGrid, private renderer: Renderer2) {
    this.htmlGrid = grid;
  }

  mouseDownEvent(element) {
    console.log(element);
    // si pinchamos en un segmento sin botón
    if (element.classList.contains("segmentClass")) {
      this.resizing = true;
      let elementObject: HtmlSchedulerSegment = this.locateHtmlObjectFromSegmentClass(
        element
      );
      elementObject.ocupied = true;
      // Creamos un objeto html
      const htmlFlightButton = new HtmlFlightButton(element, 1, this.renderer);
      this.objectResizing = htmlFlightButton;
      // Guardamos la El Botón en el array de objetos Botones
      this.htmlFlightButtons.push(htmlFlightButton);
    }
    // si pulsamos en un botón
    if (element.classList.contains("flightButton")) {
      console.log("Iniciar movimiento de botón");
    }
    /// Si pinchamos en un area de resizing
    if (element.classList.contains("resizingArea")) {
      // Gestión de Resize
      console.log("Resizing............");
      this.resizing = true;
      this.objectResizing = this.locateHtmlObjectFromResizingArea(element);
      this.objectResizing.initResizing(element);
    }
  }

  // Se ejecuta cuando se entra en un segmento vacío y se está resizing
  enlargingButtonFlight(event: MouseEvent) {
    let element: any = event.target;
    if (this.resizing) {
      if (element.classList.contains("segmentClass")) {
        if (
          this.getHourOfSegment(element) != this.objectResizing.start ||
          this.objectResizing.height == 1
        ) {
          let elementObject: HtmlSchedulerSegment = this.locateHtmlObjectFromSegmentClass(
            element
          );
          console.log(element);
          // En caso de que el segmento sobre el que se pasa el ratón no tenga aun
          // un botón...
          this.objectResizing.setHeightOfHtmlButton(element.dataset.hour);
          if (this.isFree(elementObject)) {
            this.objectResizing.updateOcupiedSegmentsArray(
              "push",
              elementObject
            );
          } else if (this.isOwn(element)) {
            this.objectResizing.updateOcupiedSegmentsArray(
              "pop",
              elementObject
            );
          }
        }
      } else {
        this.endCreatingButtonFlight(element);
      }
    }
  }

  endCreatingButtonFlight(element) {
    if (this.resizing) {
      let htmlButtonFlight = this.objectResizing;
      this.resizing = false;
      if (htmlButtonFlight.height > 0) {
        htmlButtonFlight.endResizing(element);
      } else {
        htmlButtonFlight.remove(element);
        // Eliminamos el botón
        this.htmlFlightButtons.pop();
      }
    }
  }

  //------------ MÉTODOS PRIVADOS --------------

  private locateHtmlObjectFromResizingArea(element: any): HtmlFlightButton {
    for (let i = 0; i < this.htmlFlightButtons.length; i++) {
      const htmlFlightButton = this.htmlFlightButtons[i];
      if (htmlFlightButton.resizingArea.resizingArea.id === element.id) {
        return htmlFlightButton;
      }
    }
  }

  private locateHtmlObjectFromSegmentClass(element: any): HtmlSchedulerSegment {
    let index =
      this.decodeHour(element.dataset.hour) /
      HtmlSchedulerGrid.SEGMENTTIMEINMINUTES;
    let row: HtmlSchedulerHourRow = this.htmlGrid.rowsOfSegments[index];
    let indexPlane = this.decodePlane(row, element.dataset.plane);
    let segment = row.segmentsScheduler[indexPlane];
    return segment;
  }

  private isFree(element: HtmlSchedulerSegment): boolean {
    // Si el elemento no está ocupado o es propio
    return !element.ocupied;
  }

  decodePlane(row: HtmlSchedulerHourRow, planeId: string): number {
    for (let i = 0; i < row.segmentsScheduler.length; i++) {
      const element = row.segmentsScheduler[i];
      if (element.plane == planeId) return i;
    }
    return -1;
  }
  decodeHour(hourLabel: string): number {
    let fullHour = hourLabel.split(":");
    return parseInt(fullHour[0]) * 60 + parseInt(fullHour[1]);
  }

  private isOwn(element): boolean {
    return this.objectResizing.ocupiedSegments.includes(element);
  }

  private getHourOfSegment(element): string {
    return element.dataset.hour;
  }

  private getPlaneOfSegment(element): string {
    return element.dataset.plane;
  }
}
