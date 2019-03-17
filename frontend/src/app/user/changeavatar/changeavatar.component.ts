import { Component, OnInit } from "@angular/core";
import { UploadService } from "src/app/upload.service";
import { FileUploader } from "ng2-file-upload/ng2-file-upload";
import { ActivatedRoute } from '@angular/router';

// const URL = '/api/';
const URL = "#";

@Component({
  selector: "app-changeavatar",
  templateUrl: "./changeavatar.component.html",
  styleUrls: ["./changeavatar.component.css"]
})
export class ChangeavatarComponent implements OnInit {
  constructor(private uploadService: UploadService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get("id");
    this.uploadService.setURL(URL)
  }
  ngOnInit() {}



  public fileOverBase(e: any): void {
    this.uploadService.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.uploadService.hasAnotherDropZoneOver = e;
  }
}
