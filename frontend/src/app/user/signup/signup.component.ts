import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service'
import { User } from '../../user/user.model'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user:any;

  constructor(private userService:UserService) {
    this.user = this.userService.getNewUser()
  }

  ngOnInit() {
    
  }

  newUser():void{
    console.log(this.user)
    this.userService.newUser(this.user).subscribe(res => {
      console.log(res)
      localStorage.setItem('token', res.token)
    });
  }

}
