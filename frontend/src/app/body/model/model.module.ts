import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModelService } from './model.service';
import { ListmodelsComponent } from './listmodels/listmodels.component';
import { EditmodelComponent } from './editmodel/editmodel.component';
import { ModelRoutingModule } from './model-routing.module';
import { NewmodelComponent } from './newmodel/newmodel.component';


@NgModule({
  declarations: [
    ListmodelsComponent,
    EditmodelComponent,
    NewmodelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModelRoutingModule
  ],
  providers: [
    ModelService
  ],
  exports: [
  ]
})
export class ModelModule { }
