import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SelectcompanyComponent } from './selectcompany/selectcompany.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { TeamsComponent } from './teams/teams.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';

const routes: Routes =[{path: "", component:LoginComponent},
  {path: "selectcompany", component:SelectcompanyComponent},
  {path: "projects", component:ProjectsComponent},
  {path: "addUser", component:AddUserComponent},
  {path: "announcements", component:AnnouncementsComponent},
  {path: "createProject", component:CreateProjectComponent},
  {path: "createTeam", component:CreateTeamComponent},
  {path: "editProject", component:EditProjectComponent},
  {path: "teams", component:TeamsComponent},
  {path: "userRegistry", component:UserRegistryComponent},
 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
