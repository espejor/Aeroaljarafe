import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaneService } from './plane.service';
import { ListplanesComponent } from './listplanes/listplanes.component';
import { EditplaneComponent } from './editplane/editplane.component';
import { PlaneRoutingModule } from './plane-routing.module';
import { NewplaneComponent } from './newplane/newplane.component';
import { ImgcropperModule } from '../imgcropper/imgcropper.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    ListplanesComponent,
    EditplaneComponent,
    NewplaneComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PlaneRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ConfirmationPopoverModule,
    ImgcropperModule
  ],
  providers: [
    PlaneService
  ],
  exports: [
  ]
})
export class PlaneModule { }
