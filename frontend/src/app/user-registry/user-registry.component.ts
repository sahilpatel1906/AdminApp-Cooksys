import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css']
})
export class UserRegistryComponent {

  toggleNewUser:boolean = false;
  currentUser:any;
  company:any;
  users:any;

  newUser(){
    this.toggleNewUser = !this.toggleNewUser;
  }

  constructor(private userService:UserService){}
  ngOnInit(){
    this.userService.selectedUser.subscribe(selectedUser => this.currentUser = selectedUser);
    this.userService.selectedCompany.subscribe(selectedCompany => this.company = selectedCompany);
    this.userService.getUsers(this.company.id)
    .then(users =>{
      this.users=users;
      console.log(this.users);
    })
    .catch(error=>{
      console.log(error);
    });
  }


  updateUsers(user:any){
    console.log(user);
    
    this.users.unshift(user);
  }


}
