import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = undefined;

  constructor(private userService: UserService){
  }
  ngOnInit(): void {
    this.userService.selectedUser.subscribe(selectedUser => this.user = selectedUser);
  }

  

}
