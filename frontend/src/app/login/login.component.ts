import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import CredentialsDto from 'src/types/CredentialsDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user:any = undefined;
  credentialsDto:CredentialsDto = {
    username: "",
    password:""
  }; 
  loginForm:FormGroup = new FormGroup({
    email: new FormControl<string>("",
      [Validators.required,Validators.minLength(1)
      ]),
    password: new FormControl<string>("", [
      Validators.required, Validators.minLength(1)
    ]),

  });credentialCheck: boolean = false;
;

  constructor(private userService:UserService, private router: Router){}

  onInit(){
    
  }

  login(){
    
    console.log(this.loginForm.controls['email'].value);
    this.credentialsDto.username = this.loginForm.controls['email'].value;
    this.credentialsDto.password = this.loginForm.controls['password'].value;
    this.userService.userLogin(this.credentialsDto)
    .then(user =>{
      this.credentialCheck = false;
      this.user=user;
      this.userService.updateSelectedUser(this.user);
      console.log(this.user);
      console.log(this.userService.selectedUser);
      if(this.user.admin){
        this.router.navigateByUrl("/selectcompany");
      }
      else{
        console.log(this.user.companies);
        this.userService.updateSelectedCompany(this.user.companies[0]);
        this.router.navigateByUrl("/announcements");
        
      }
    })
    .catch(error=>{
      this.loginForm.reset();
      this.credentialCheck = true;
      
      console.log(error);
    })
  
  
    
  }
}
