import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SelectcompanyComponent } from './selectcompany/selectcompany.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { TeamsComponent } from './teams/teams.component';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';
import { AddUserComponent } from './add-user/add-user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { ProjectCardComponent } from './project-card/project-card.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SelectcompanyComponent,
    AnnouncementsComponent,
    TeamsComponent,
    ProjectsComponent,
    CreateProjectComponent,
    CreateTeamComponent,
    EditProjectComponent,
    UserRegistryComponent,
    AddUserComponent,
    NavbarComponent,
    CreateAnnouncementComponent,
    ProjectCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
