import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrandService } from "./brand.service";
import { ListbrandsComponent } from "./listbrands/listbrands.component";
import { EditbrandComponent } from "./editbrand/editbrand.component";
import { BrandRoutingModule } from "./brand-routing.module";
import { NewbrandComponent } from "./newbrand/newbrand.component";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { from } from "rxjs";
import { ImgcropperModule } from '../imgcropper/imgcropper.module';

@NgModule({
  declarations: [
    ListbrandsComponent,
    EditbrandComponent,
    NewbrandComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrandRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ConfirmationPopoverModule,
    ImgcropperModule
  ],
  providers: [BrandService],
  exports: []
})
export class BrandModule {}
