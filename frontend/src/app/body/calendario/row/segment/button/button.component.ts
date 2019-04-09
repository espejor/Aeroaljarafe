import { Component, OnInit, Input } from "@angular/core";
import { CalendarioService } from "../../../calendario.service";
import { Observable } from "rxjs";
import { HtmlButton } from "./htmlButton";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.css"]
})
export class ButtonComponent implements OnInit {
  @Input() created = false;
  @Input() row;
  @Input() plane;
  @Input()   public set height(value: number) {
    if (!this.calendarioService.enlargingBlocked)
      this._height = value;
  }
  private _height: number = 2;
  //private styleCSS: string = "height: 2rem";
  //private height$: Observable<number>; //Observable que se actualiza automáticamente

  //private htmlButton: HtmlButton = new HtmlButton();

  constructor(private calendarioService: CalendarioService) {}

  ngOnInit() {
    // this.height$ = this.htmlButton.getHeight$();
    // this.height$.subscribe(height => (this.height = height));
  }

  enterButtonFlight(element) {
    if (this.calendarioService.enlarging)
      this.calendarioService.enlargingBlocked = true
  }


  public get height(): number {
    return this._height;
  }

}
