import { Component, OnInit } from "@angular/core";
import { UploadService } from "src/app/upload.service";
import { FileUploader } from "ng2-file-upload/ng2-file-upload";

const // const URL = '/api/';
  URL = "#";


  @Component({
    selector: "app-changeavatar",
    templateUrl: "./changeavatar.component.html",
    styleUrls: ["./changeavatar.component.css"]
  })
export class UploadfilesComponent implements OnInit {
  constructor(private uploadService: UploadService) {}
  ngOnInit() {}

  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}
