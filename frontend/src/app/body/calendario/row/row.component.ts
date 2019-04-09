import { Component, OnInit, ViewChild, Output } from "@angular/core";
import { SegmentComponent } from "./segment/segment.component";

@Component({
  selector: "app-row",
  templateUrl: "./row.component.html",
  styleUrls: ["../calendario.component.css"]
})
export class RowComponent implements OnInit {
  @ViewChild("segments") segments: SegmentComponent;

  private rows = [];
  private planes = [{ id: "aaaaa" }, { id: "bbbbb" }];
  constructor() {}

  ngOnInit() {
    for (let i = 0; i < 24; i++) {
      this.rows[2*i] = {hour:`${i}:00`};
      this.rows[2*i + 1] = {hour:`${i}:30`};
    }
  }
}
