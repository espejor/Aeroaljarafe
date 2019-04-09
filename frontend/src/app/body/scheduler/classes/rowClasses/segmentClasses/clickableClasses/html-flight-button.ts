import { Renderer2, ElementRef } from "@angular/core";
import { HtmlSchedulerSegment } from "../html-scheduler-segment";
import { HtmlSchedulerTimeSegment } from "../html-scheduler-time-segment";
import { HtmlButtonElement } from "./elementClasses/html-button-element";
import { HtmlResizingArea } from "./html-resizing-area";
import { HtmlSchedulerHourRow } from "../../html-scheduler-hour-row";
import { HtmlSchedulerGrid } from "../../../html-scheduler-grid";

export class HtmlFlightButton {
  private _start: string;
  private _height: number; // número de periodos básicos de tiempo que dura el vuelo
  private _plane: string; // Avión que realiza el vuelo
  private _htmlButtonElement: HtmlButtonElement; // El Botón html
  private _parent: HtmlSchedulerSegment; // el elemento que contiene al DIV padre del Botón

  private _resizingArea: HtmlResizingArea; // Area para hacer resize del botón

  private _ocupiedSegments: HtmlSchedulerSegment[] = [];

  constructor(element: any, height: number, private renderer: Renderer2) {
    this._start = element.dataset.hour;
    this._plane = element.dataset.plane;
    this._height = height;
    this._parent = element;

    this.htmlButtonElement = this.renderer.createElement("BUTTON");

    this.configButtonElement();
    this.updateOcupiedSegmentsArray("push", this.parent);
    this._resizingArea = new HtmlResizingArea(this, this.renderer);
  }

  configButtonElement() {
    this.renderer.setAttribute(this.htmlButtonElement, "hour", this.start);

    this.renderer.setAttribute(this.htmlButtonElement, "plane", this.plane);
    this.renderer.setAttribute(this.htmlButtonElement, "height", "1");

    this.renderer.addClass(this.htmlButtonElement, "flightButton");
    this.renderer.addClass(this.htmlButtonElement, "btn");
    this.renderer.addClass(this.htmlButtonElement, "btn-info");
    this.renderer.addClass(this.htmlButtonElement, "border");

    // Enganchamos el botón a su elemento padre
    this.renderer.appendChild(this.parent, this.htmlButtonElement);
  }

  updateOcupiedSegmentsArray(
    action: string,
    element: HtmlSchedulerSegment
  ) {
    if (action == "push") {
      // Le decimos a la celda que contiene el inicio que está ocupada
      element.ocupied = true;
      // Guardamos la celda (que es el parent) en un array de celdas ocupadas
      this._ocupiedSegments.push(element);
    }
    if (action == "pop") {
      element.ocupied = false;
      this._ocupiedSegments.pop();}
  }

  initResizing(element: any) {
    this.renderer.removeStyle(this.htmlButtonElement, "position");
  }

  endResizing(element: any) {
    this.setStyleHtml("z-index", "20");
    this.setStyleHtml("position", "relative");
  }

  remove(element: any) {
    this.renderer.removeChild(parent, this.htmlButtonElement);
    this.renderer.removeChild(parent, this.resizingArea.resizingArea);
    this.ocupiedSegments = [];
  }

  public get start(): string {
    return this._start;
  }

  public get height(): number {
    return this._height;
  }

  public get plane(): string {
    return this._plane;
  }

  public get parent(): HtmlSchedulerSegment {
    return this._parent;
  }

  public set start(v: string) {
    this._start = v;
  }

  public set parent(v: HtmlSchedulerSegment) {
    this._parent = v;
  }

  public set height(v: number) {
    this._height = v;
    this.setHeight(v);
  }

  public set plane(v: string) {
    this._plane = v;
  }

  public get htmlButtonElement(): HtmlButtonElement {
    return this._htmlButtonElement;
  }

  public set htmlButtonElement(v: HtmlButtonElement) {
    this._htmlButtonElement = v;
  }

  public set resizingArea(v: any) {
    this._resizingArea = v;
  }

  public get resizingArea(): any {
    return this._resizingArea;
  }

  public setHeightOfHtmlButton(finalSegmentHour: string) {
    this.height = this.calculateHeightButton(finalSegmentHour);
  }

  public get ocupiedSegments(): HtmlSchedulerSegment[] {
    return this._ocupiedSegments;
  }
  public set ocupiedSegments(value: HtmlSchedulerSegment[]) {
    this._ocupiedSegments = value;
  }
  private calculateHeightButton(finalSegmentHour: string): number {
    // La hora final la obtenemos de la hora del segmento donde se suelta
    const _endHour = finalSegmentHour.split(":");
    // Guardamos la hora de inicio del botón
    const _initHour = this.start.split(":");
    const endHour = new Date(0, 0, 0, +_endHour[0], +_endHour[1], 0);
    const initHour = new Date(0, 0, 0, +_initHour[0], +_initHour[1], 0);
    let interval = (+endHour - +initHour) / 60000; // (30 => 2rem, 60 => 4rem, ...)
    return interval / HtmlSchedulerGrid.SEGMENTTIMEINMINUTES + 1;
  }

  setHeight(value: number) {
    this.renderer.setAttribute(
      this.htmlButtonElement,
      "height",
      value.toString()
    );
    this.setStyleHtml(
      "height",
      (HtmlSchedulerHourRow.HEIGHTSEGMENT * value).toString() + "rem"
    );
    this.updateText();
  }

  private updateText() {
    this.renderer.setProperty(
      this.htmlButtonElement,
      "innerText",
      `Inicio: ${this.start}\nT. Vuelo: ${this.height *
        HtmlSchedulerGrid.SEGMENTTIMEINMINUTES}\"`
    );
    this.renderer.setProperty(this.htmlButtonElement, "data-toggle", `tooltip`);
    this.renderer.setProperty(
      this.htmlButtonElement,
      "title",
      `Inicio: ${this.start}\nT. Vuelo: ${this.height *
        HtmlSchedulerGrid.SEGMENTTIMEINMINUTES}\"`
    );
  }

  public setStyleHtml(style: string, value: string) {
    this.renderer.setStyle(this.htmlButtonElement, style, value);
  }
}
