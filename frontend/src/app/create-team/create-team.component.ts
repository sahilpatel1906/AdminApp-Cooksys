import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
})


export class CreateTeamComponent {
  @Output() close = new EventEmitter<void>();
  @Output() childComponentValue = new EventEmitter<any>();
  @Output() createdTeam = new EventEmitter<any>();

  memberList: any;
  submitMemberList: any[] = [];
  selectedMember: string = "";
  name: string = "";
  description: string = "";
  teamForm:FormGroup = new FormGroup({
    name: new FormControl('',
      [Validators.required,Validators.minLength(3)
      ]),
    description: new FormControl('', [
      Validators.required,Validators.minLength(5)
    ]),
    teamMembers: new FormControl('', [
      Validators.required
    ]),
  });;
  user: any;
  team: any;
  company : any;
  newTeam: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(){
    this.userService.selectedCompany.subscribe(selectedCompany => this.company = selectedCompany);
    this.userService.selectedUser.subscribe(selectedUser => this.user = selectedUser);
    this.userService.getUsers(this.company.id).then(users=>{
      this.memberList = users;  
    });
    //console.log(this.user.id);
  }


  addMember(){
    // console.log(event);
    // this.memberList.forEach((member: any) => {
    //   if (member.profile.firstName === event){
    //     this.submitMemberList.push(member);
    //     return;
    //   }
    // });
    this.submitMemberList.push(this.teamForm.controls['teamMembers'].value)
    console.log(this.submitMemberList);
  }

  deleteMember(name: any){
    this.submitMemberList = this.submitMemberList.filter((member) => name.profile.firstName != member.profile.firstName);
  }

  async formSubmit(){
    this.name = this.teamForm.controls['name'].value;
    this.description = this.teamForm.controls['description'].value;
    this.team = {name: this.name, description: this.description, teammates: this.submitMemberList};
    this.newTeam = await this.userService.postTeam(this.company.id, this.team);
    this.childComponentValue.emit(false);
    this.createdTeam.emit(this.newTeam);
    this.close.emit();
  }

  closeBox() {
    this.close.emit();
  }
}
