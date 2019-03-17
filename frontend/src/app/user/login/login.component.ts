import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User;

  constructor(private userService:UserService) {
    this.user = this.userService.getNewUser()
  }
  ngOnInit() {
    
  }

  login(){
    console.log(this.user)
    this.userService.login(this.user).subscribe(res => {
      console.log(res)
      localStorage.setItem('token', res.token)
    });
  }
}
