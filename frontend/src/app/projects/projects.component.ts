import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import Project from 'src/types/Project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  toggleCreate: boolean = false;
  projects: Project[] = [];
  user: any = undefined;
  team: any = undefined;
  company: any = undefined;

  constructor(private userService: UserService, private router: Router) {
  }
  ngOnInit(): void {
    this.userService.selectedUser.subscribe(selectedUser => this.user = selectedUser);
    this.userService.selectedCompany.subscribe(selectedCompany => this.company = selectedCompany);
    this.userService.selectedTeam.subscribe(selectedTeam => this.team = selectedTeam);
    this.userService.getProjects(this.company.id, this.team.id).subscribe((response: any) => {
      console.log(this.projects)
      this.projects = response
    })
    // this.userService.getProjects().subscribe((response: any) => {
    //   console.log(this.projects)
    //   this.projects = response
    // })
  }

  newProject(){
    this.toggleCreate = !this.toggleCreate;
  }

  modalOutsideClicked(event : any) {
    if(event.target.getAttribute('class') == "overlay"){
      this.toggleCreate = !this.toggleCreate;
    }
  }

  updateProjects(project: Project) {
    console.log(project);
    this.projects.unshift(project);
  }

  editedProjectUpdate(editedProject: Project | null){
    console.log("edited")
    if(editedProject != null){
      this.projects = this.projects.map((project)=>{
        if(project.id == editedProject.id){
          return editedProject;
        } else {
          return project;
        }
      })
    }
  }

  backToTeams(){
    this.router.navigateByUrl("/teams")
    return false;
  }

}
