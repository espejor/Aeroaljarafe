import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showuser',
  templateUrl: './showuser.component.html',
  styleUrls: ['./showuser.component.css']
})
export class ShowuserComponent implements OnInit {
  user: User;
  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.getUser();
  }

  ngOnInit() {}

  getUser(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.userService.getUser(id).subscribe(user => {
      this.user = user.user;
      console.log(this.user);
    });
  }
}
