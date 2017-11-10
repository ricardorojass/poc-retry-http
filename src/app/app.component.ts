import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users = [];

  constructor(private usersService: UsersService) {
    this.usersService.getUsers()
      .subscribe(users => this.users = users);
  }

  onSubmit(user: any): void {
    this.usersService.addUser(user)
      .subscribe(data => {
        this.users.push(data);
      });
  }
}
