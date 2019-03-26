import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListflightsComponent } from './listflights/listflights.component';
import { EditflightComponent } from './editflight/editflight.component';
import { NewflightComponent } from './newflight/newflight.component';


const routes: Routes = [
  {path:'flights', component: ListflightsComponent},
  //{path:'flight/show/:id', component: ShowflightComponent},
  {path:'flight/edit/:id', component: EditflightComponent},
  {path:'flights/new', component: NewflightComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
