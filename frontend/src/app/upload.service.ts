import { Injectable } from "@angular/core";
import { FileUploader } from "ng2-file-upload";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  private  URL:string = ""

  public uploader: FileUploader = new FileUploader({ url: this.URL });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public setURL(url:string) {
    this.URL = url
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}
