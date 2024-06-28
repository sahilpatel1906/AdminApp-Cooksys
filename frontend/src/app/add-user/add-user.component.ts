import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { BasicUserDto } from 'src/types/BasicUserDto';
import CredentialsDto from 'src/types/CredentialsDto';
import ProfileDto from 'src/types/ProfileDto';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  @Output() close = new EventEmitter<void>();
  @Output() createdUser = new EventEmitter<any>();

  newUser:any;
  credentialsDto:CredentialsDto ={
    username : "",
    password : ""
  }
  profiledDto: ProfileDto ={
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  }
  isadmin: boolean = false;
  newUserForm:FormGroup = new FormGroup({
    fname: new FormControl('',
      [Validators.required,
      ]),
    lname: new FormControl('', [
      Validators.required,
    ]),
    username: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    confirm: new FormControl('', [
      Validators.required,
    ]),
    isAdmin: new FormControl<boolean | null>(null)
    
  });;

  constructor(private userService: UserService){}
  
  closeBox() {
    this.close.emit();
  }


  async submit() {
    await this.postUser();
    this.createdUser.emit(this.newUser);
    this.close.emit();
  }

  async postUser(){
    this.credentialsDto.username = this.newUserForm.controls['username'].value;
    this.credentialsDto.password = this.newUserForm.controls['password'].value;
    this.profiledDto.email = this.newUserForm.controls['email'].value;
    this.profiledDto.firstName = this.newUserForm.controls['fname'].value;
    this.profiledDto.lastName = this.newUserForm.controls['lname'].value;
    this.profiledDto.phone = this.newUserForm.controls['phone'].value;
    this.isadmin = this.newUserForm.controls['isAdmin'].value;
    console.log({credentials:this.credentialsDto,profile:this.profiledDto,isAdmin: this.isadmin});

    this.newUser = await firstValueFrom(this.userService.postUser({credentials:this.credentialsDto,profile:this.profiledDto,isAdmin: this.isadmin}));
    console.log(this.newUser);
    

  }

}
