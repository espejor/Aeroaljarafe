import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { Subject } from 'rxjs';
import { ImgcropperService } from './imgcropper.service';

@Component({
  selector: 'app-imgcropper',
  templateUrl: './imgcropper.component.html',
  styleUrls: ['./imgcropper.component.css']
})
export class ImgcropperComponent implements OnInit {
  private image$ = new Subject();

  private aspectRatio: number = 1/1;

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  constructor(private imgcropperService:ImgcropperService) { }

  ngOnInit() {
  }

  
  private uploadImage(files:File[]){
    
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  imgLoaded: boolean = false ;

  fileChangeEvent(event: any): void {
    $("#image-label").html(event.srcElement.files[0].name)
    this.imageChangedEvent = event;
    this.imgLoaded = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.imgcropperService.imageCropped(event)
    this.croppedImage = event.base64;
    //this.image$.next(this.croppedImage)
  }

  imageLoaded() {
      console.log("Imagen cargada")
      
  }
  loadImageFailed() {
      // show message
  }

  rotateLeft() {
    this.imageCropper.rotateLeft();
  }
  rotateRight() {
    this.imageCropper.rotateRight();
  }
  flipHorizontal() {
    this.imageCropper.flipHorizontal();
  }
  flipVertical() {
    this.imageCropper.flipVertical();
  }
}
