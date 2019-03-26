import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListavailabilitiesComponent } from './listavailabilities/listavailabilities.component';
import { EditavailabilityComponent } from './editavailability/editavailability.component';
import { NewavailabilityComponent } from './newavailability/newavailability.component';


const routes: Routes = [
  {path:'availabilities', component: ListavailabilitiesComponent},
  //{path:'availability/show/:id', component: ShowavailabilityComponent},
  {path:'availability/edit/:id', component: EditavailabilityComponent},
  {path:'availabilities/new', component: NewavailabilityComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvailabilityRoutingModule { }
