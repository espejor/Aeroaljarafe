import { Component, OnInit, Input } from "@angular/core";
import { CalendarioService } from "src/app/body/calendario/calendario.service";

@Component({
  selector: "app-resizing-area",
  templateUrl: "./resizing-area.component.html",
  styleUrls: ["./resizing-area.component.css"]
})
export class ResizingAreaComponent implements OnInit {
  @Input() row;
  @Input() plane;
  @Input() created = false;
  constructor(private calendarioService: CalendarioService) {}

  ngOnInit() {}

  initEnlargingButtonFlight(element) {
    console.log("Iniciar resizing");
    this.calendarioService.resizing = true;
    this.calendarioService.setSegmentResizing(`${this.row.hour}_${this.plane.id}`);
  }
}
