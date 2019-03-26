import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModelService } from './model.service';
import { ListmodelsComponent } from './listmodels/listmodels.component';
import { EditmodelComponent } from './editmodel/editmodel.component';
import { ModelRoutingModule } from './model-routing.module';
import { NewmodelComponent } from './newmodel/newmodel.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ImgcropperModule } from '../imgcropper/imgcropper.module';


@NgModule({
  declarations: [
    ListmodelsComponent,
    EditmodelComponent,
    NewmodelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModelRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ConfirmationPopoverModule,
    ImgcropperModule
  ],
  providers: [
    ModelService
  ],
  exports: [
  ]
})
export class ModelModule { }
