import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {

  users: any;
  constructor(private userService:UserService){
     
    }

  ngOnInit() { this.getUsers();}

  getUsers(){
    this.userService.getUsers().subscribe(data => {
      console.log(data.users);
      this.users = data.users
    }, (err) => {
      console.log(err);
    })
  }

  deleteUser(id:string){
    if (confirm("¿Estás seguro que deseas eliminar el registro?")) {
      this.userService.deleteUser(id).subscribe(data => {
        console.log(data)
        this.deleteElementFromUsers(data.user)
      }, (err) => {
        console.log(err);
      })
    }
  }

  private deleteElementFromUsers(user:User){
    console.log(JSON.stringify(user))
    var i = this.findIndex(this.users,user)
    this.users.splice(i,1);
  }

  private findIndex(array:any[],item:any):number{
    var i = 0;
    for(i ;i<array.length;i++){
      if (array[i]._id == item._id){
        return i;
      }
    }
    return -1;
  }
}
