import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ListusersComponent } from './listusers/listusers.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ShowuserComponent } from './showuser/showuser.component';
import { ChangeavatarComponent } from './changeavatar/changeavatar.component';
import { EditpersonaluserdataComponent } from './editpersonaluserdata/editpersonaluserdata.component';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'users', component: ListusersComponent},

  {path:'user/show/:id', component: ShowuserComponent},
  {path:'user/changeavatar/:id', component: ChangeavatarComponent},
  {
    path:'user/edit/:id', 
    component: EdituserComponent
    // ,
    // children: [
    //   {path:'personaldata', component: EditpersonaluserdataComponent}
    // ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
