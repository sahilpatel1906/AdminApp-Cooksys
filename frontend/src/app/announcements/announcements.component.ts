import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent {

  toggleCreate: boolean = false;
  announcements: any = undefined;
  company: any = undefined;
  user: any;
 


  constructor(private userService: UserService){}
  

  ngOnInit(): void {
    //to be changed, probably should be moved to its own file with the other api calls. Probably could do that with us passing in just the company id
    this.userService.selectedCompany.subscribe(selectedCompany => this.company = selectedCompany);
    this.userService.selectedUser.subscribe(selectedUser => this.user = selectedUser);

    console.log(this.user);
    console.log(this.company.id + " this is the company");
    let data = this.userService.getAnnouncements(this.company.id);
    data
    .then(announcements =>{
      this.announcements=announcements;
      console.log(this.announcements);
    })
    .catch(error=>{
      console.log(error);
    })
  }

  newAnnouncement(){
    this.toggleCreate = !this.toggleCreate;
  }

  async receivedFromChild(event: any){
    this.userService.selectedCompany.subscribe(selectedCompany => this.company = selectedCompany);
    this.userService.selectedUser.subscribe(selectedUser => this.user = selectedUser);
    console.log(this.company);
    event.then(() => {
      this.userService.getAnnouncements(this.company.id)
      .then(announcements =>{
        this.announcements=announcements;
        console.log(this.announcements);
      })
      .catch(error=>{
        console.log(error);
      })
    })
  }

}
