import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selectcompany',
  templateUrl: './selectcompany.component.html',
  styleUrls: ['./selectcompany.component.css']
})
export class SelectcompanyComponent {
  companyList: any = undefined;
  user: any = undefined;

  constructor(private userService: UserService, private router: Router){
    this.userService.selectedUser.subscribe(selectedUser => this.user = selectedUser);
  }
  ngOnInit():void{
    this.companyList = this.user.companies;
  }

  companyForm: FormGroup = new FormGroup({
    company: new FormControl<string>("")
  })

  companySubmit(){
    this.userService.updateSelectedCompany(this.companyForm.controls['company'].value);
    this.router.navigateByUrl("/announcements");
  }

  



}
