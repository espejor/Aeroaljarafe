import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListplanesComponent } from './listplanes/listplanes.component';
import { EditplaneComponent } from './editplane/editplane.component';
import { NewplaneComponent } from './newplane/newplane.component';


const routes: Routes = [
  {path:'planes', component: ListplanesComponent},
  {path:'plane/edit/:id', component: EditplaneComponent},
  {path:'planes/new', component: NewplaneComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaneRoutingModule { }
