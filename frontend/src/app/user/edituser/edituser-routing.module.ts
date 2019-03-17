import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditpersonaluserdataComponent } from '../editpersonaluserdata/editpersonaluserdata.component';



const routes: Routes = [
  // {path:'user/edit/:id/personaldata', component: EditpersonaluserdataComponent},

];

@NgModule({
  imports: [
    ],
  exports: [RouterModule]
})
export class EdituserRoutingModule { }
