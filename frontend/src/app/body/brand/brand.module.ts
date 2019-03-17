import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrandService } from './brand.service';
import { ListbrandsComponent } from './listbrands/listbrands.component';
import { EditbrandComponent } from './editbrand/editbrand.component';
import { BrandRoutingModule } from './brand-routing.module';
import { NewbrandComponent } from './newbrand/newbrand.component';


@NgModule({
  declarations: [
    ListbrandsComponent,
    EditbrandComponent,
    NewbrandComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrandRoutingModule
  ],
  providers: [
    BrandService
  ],
  exports: [
  ]
})
export class BrandModule { }
