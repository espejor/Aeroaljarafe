import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ImageCropperModule } from "ngx-image-cropper";
import { ImgcropperComponent } from "../imgcropper/imgcropper.component";
import { from } from "rxjs";
import { ImgcropperService } from './imgcropper.service';

@NgModule({
  declarations: [
    ImgcropperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ImageCropperModule
  ],
  providers: [ImgcropperService],
  exports: [ImgcropperComponent]
})
export class ImgcropperModule {}