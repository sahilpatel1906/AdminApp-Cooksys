import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {

  teamList: any;
  showOverlay: Boolean = false;
  company : any;
  user: any;
  toggleCreate: boolean = false;


  constructor(private userService: UserService, private router: Router){}

  recievedFromChild(event: any) {
    this.showOverlay = false;
  }

  ngOnInit(){
    
    this.userService.selectedCompany.subscribe(selectedCompany => this.company = selectedCompany);
    this.userService.selectedUser.subscribe(selectedUser => this.user = selectedUser);
    this.userService.getTeams(this.company.id).subscribe((response: any) => {
      this.teamList = [];
      if(!this.user.admin){
        response.forEach((team: any) => {
          team.teammates.forEach((member: any) => {
            console.log(this.user.profile.firstName);
            if(member.profile.firstName === this.user.profile.firstName){
              this.teamList.push(team);
              return;
            }
          })
        })
      }
      else{
        this.teamList = response;
      }
      console.log(this.teamList);
      this.teamList.map((team: any) => {
        let projectNum = 0;
        this.userService.getTeamProjects(this.company.id, team.id).subscribe((projects: any) =>{
          console.log(projects.length);
          projectNum = projects.length;
          Object.defineProperty(team, "projectNumber", {value: projectNum})
        });
      });
    })

 
    
  }

  testFunc(){
    this.showOverlay = true;
    //document.getElementById("overlay-container")!.style.display = "block";
  }

  projectSelect(team: any){
    console.log(team)
    this.userService.updateSelectedTeam(team);
    this.router.navigateByUrl("/projects");
    return false;
  }

  async receivedNewTeam(event: any){
    this.userService.getTeams().subscribe((response: any) => {
      this.teamList = response;
      console.log(this.teamList);
      this.teamList.map((team: any) => {
        let projectNum = 0;
        this.userService.getTeamProjects(this.company.id, team.id).subscribe((projects: any) =>{
          console.log(projects.length);
          projectNum = projects.length;
          Object.defineProperty(team, "projectNumber", {value: projectNum})
        });
      });
    })
  }

  newTeam(){
    console.log("clicked")
    this.toggleCreate = !this.toggleCreate;
    console.log(this.toggleCreate)
  }

  modalOutsideClicked(event : any) {
    if(event.target.getAttribute('class') == "overlay"){
      this.toggleCreate = !this.toggleCreate;
    }
  }
}
