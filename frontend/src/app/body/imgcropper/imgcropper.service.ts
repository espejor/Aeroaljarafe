import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Injectable({
  providedIn: 'root'
})
export class ImgcropperService {
  private image$ = new Subject();
  
  imageChangedEvent: any = '';
  croppedImage: any = ""

  constructor() { }

  getImage$(): Observable<any>{
    return this.image$.asObservable();
  }

  imageCropped(event: ImageCroppedEvent) {
    const fileToUpload : File = new File([this.dataURItoBlob(event.base64)], 'filename.png');
    //this.croppedImage = event.base64;
    this.image$.next(fileToUpload)
  }


  private dataURItoBlob(dataURI): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

}
