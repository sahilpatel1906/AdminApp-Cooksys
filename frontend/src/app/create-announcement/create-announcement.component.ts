import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent {

  @Output() close = new EventEmitter<void>();
  @Output() createdAnnouncement = new EventEmitter<any>();

  title: string = "";
  message: string = "";
  newAnnouncement: any;
  user: any = undefined;
  company: any;

  announcementForm:FormGroup = new FormGroup({
    title: new FormControl('',
      [Validators.required, Validators.minLength(3)
      ]),
    message: new FormControl('', [
      Validators.required, Validators.minLength(5)
    ]),
  });;

  constructor(private userService: UserService){}

  ngOnInit(){
    this.userService.selectedUser.subscribe(selectedUser => this.user = selectedUser);
    this.userService.selectedCompany.subscribe(selectedCompany => this.company = selectedCompany);
    //console.log(this.user.id);
  }

  async submit() {
    await this.postAnnouncement();
    console.log('in submit ' + this.newAnnouncement);
    this.createdAnnouncement.emit(this.newAnnouncement);
    this.close.emit();
  }

  async postAnnouncement(){
    this.title = this.announcementForm.controls['title'].value;
    this.message = this.announcementForm.controls['message'].value;
    this.newAnnouncement = this.userService.postAnnouncement(this.company.id, {title: this.title, message: this.message, userId:this.user.id})
      .then((data) => {
        console.log(data);
      });
  }

  closeBox() {
    this.close.emit();
  }

}
