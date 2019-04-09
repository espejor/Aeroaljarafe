import { HtmlFlightButton } from "./html-flight-button";
import { ElementRef, Renderer2 } from "@angular/core";

export class HtmlResizingArea {
  private _sibling: HtmlFlightButton;
  private _resizingArea : ElementRef;

  constructor(sibling: HtmlFlightButton, private renderer: Renderer2) {
    this._sibling = sibling;
    this._resizingArea = this.renderer.createElement("DIV");
    this.renderer.setAttribute(this._resizingArea, "id", new Date().toString());
    this.renderer.setAttribute(this._resizingArea, "height", "16px");
    this.renderer.setAttribute(this._resizingArea, "whidth", "100%");
    this.renderer.setStyle(this._resizingArea, "position", "relative");
    //this.renderer.setAttribute(this._resizingArea, "hiden", "true");
    this.renderer.addClass(this._resizingArea, "resizingArea");
    this.renderer.appendChild(this.sibling.parent, this.resizingArea);
  }

  public get sibling(): HtmlFlightButton {
    return this._sibling;
  }

  public set sibling(v: HtmlFlightButton) {
    this._sibling = v;
  }

  
  public set resizingArea(v : ElementRef) {
      this._resizingArea = v;
  }

  
  public get resizingArea() : ElementRef {
      return this._resizingArea;
  }
  
  
}
