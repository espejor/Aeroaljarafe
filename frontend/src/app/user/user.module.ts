import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ListusersComponent } from './listusers/listusers.component';
import { EdituserComponent } from './edituser/edituser.component';
import { UserRoutingModule } from './user-routing.module';
import { ShowuserComponent } from './showuser/showuser.component';
import { ChangeavatarComponent } from './changeavatar/changeavatar.component';
import { FileDropModule } from 'ngx-file-drop';
import { FileUploadModule } from 'ng2-file-upload';
import { EdituserModule } from './edituser/edituser.module';
import { EdituserRoutingModule } from './edituser/edituser-routing.module';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ListusersComponent,
    EdituserComponent,
    ShowuserComponent,
    ChangeavatarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    EdituserRoutingModule,
    EdituserModule,
    FileDropModule,
    FileUploadModule 
  ],
  providers: [
    UserService
  ],
  exports: [
    // SignupComponent,
    // //LoginComponent,
    // ListusersComponent
  ]
})
export class UserModule { }
