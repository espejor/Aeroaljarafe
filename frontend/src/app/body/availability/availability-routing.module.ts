import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListavailabilitysComponent } from './listavailabilitys/listavailabilitys.component';
import { EditavailabilityComponent } from './editavailability/editavailability.component';
import { NewavailabilityComponent } from './newavailability/newavailability.component';


const routes: Routes = [
  {path:'availabilitys', component: ListavailabilitysComponent},
  //{path:'availability/show/:id', component: ShowavailabilityComponent},
  {path:'availability/edit/:id', component: EditavailabilityComponent},
  {path:'availabilitys/new', component: NewavailabilityComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvailabilityRoutingModule { }
