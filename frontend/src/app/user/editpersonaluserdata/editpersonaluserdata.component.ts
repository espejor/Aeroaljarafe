import { Component, OnInit } from '@angular/core';
import { EdituserComponent } from '../edituser/edituser.component';
import { User } from '../user.model';
import { UserComponent } from '../user.component';

@Component({
  selector: 'app-editpersonaluserdata',
  templateUrl: './editpersonaluserdata.component.html',
  styleUrls: ['./editpersonaluserdata.component.css']
})

export class EditpersonaluserdataComponent implements OnInit {
  editUserComponent:EdituserComponent
  user:User = new User()
  constructor(private userImported:EdituserComponent) {
    this.editUserComponent = this.userImported
    this.editUserComponent.ngOnInit()
   }

  ngOnInit() {
  }

}
