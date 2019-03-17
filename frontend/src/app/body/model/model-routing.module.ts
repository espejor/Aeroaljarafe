import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListmodelsComponent } from './listmodels/listmodels.component';
import { EditmodelComponent } from './editmodel/editmodel.component';
import { NewmodelComponent } from './newmodel/newmodel.component';


const routes: Routes = [
  {path:'models', component: ListmodelsComponent},
  {path:'model/edit/:id', component: EditmodelComponent},
  {path:'models/new', component: NewmodelComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelRoutingModule { }
