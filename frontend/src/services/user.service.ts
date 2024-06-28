import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Project from 'src/types/Project';
import CreateProjectRequestDto from 'src/types/CreateProjectRequestDto';
import ProjectRequestDto from 'src/types/ProjectRequestDto';
import CredentialsDto from 'src/types/CredentialsDto';
import { BasicUserDto } from 'src/types/BasicUserDto';

const backendUrl = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private selectedUserSource = new BehaviorSubject<Object>({});
  selectedUser = this.selectedUserSource.asObservable();

  private selectedCompanySource = new BehaviorSubject<any>(undefined);
  selectedCompany = this.selectedCompanySource.asObservable();

  private selectedTeamSource = new BehaviorSubject<any>(undefined);
  selectedTeam = this.selectedTeamSource.asObservable();

  updateSelectedUser(newUser: Object){
    this.selectedUserSource.next(newUser);
  }

  updateSelectedCompany(newCompany: Object){
    this.selectedCompanySource.next(newCompany);
  }

  updateSelectedTeam(newTeam: Object){
    this.selectedTeamSource.next(newTeam);
  }

  constructor(private http: HttpClient) { }

  async getAnnouncements(id = '6'){
    let data = await this.http.get(backendUrl + `company/${id}/announcements`).toPromise()
    console.log(data);
    return data;
  }

  async postAnnouncement(id = 6, announcement: any){
    let data = await this.http.post(backendUrl + `company/${id}/announcements`, announcement).toPromise()
    console.log(data);
    return data;
  }

  async userLogin(credentialsDto:CredentialsDto){
    console.log(credentialsDto.username)
    let data = await this.http.post(backendUrl + 'users/login',credentialsDto).toPromise();
    console.log(data);
    return data
  }

  getProjects(companyId = '6', teamId = '11') {
    return this.http.get(backendUrl + `company/${companyId}/teams/${teamId}/projects/all`);
  }

  postProject(createProjectRequestDto: CreateProjectRequestDto){
    return this.http.post<Project>(backendUrl + `projects`, createProjectRequestDto);
  }

  editProject(projectRequestDto: ProjectRequestDto){
    return this.http.patch<Project>(backendUrl + `projects`, projectRequestDto);
  }

  async getUsers(id = ''){
    return this.http.get(backendUrl + `company/${id}/users`).toPromise();

  }

  postUser(newUser:Object){
    let data= this.http.post<BasicUserDto>(backendUrl + `users`, newUser);
    console.log(data);
    return data;
  }

  getTeams(id = 6){
    return this.http.get(backendUrl + `company/${id}/teams`);
  }

  postTeam(id = 6, teamDto: any){
    return this.http.post(backendUrl + `company/${id}/teams`, teamDto).toPromise();
  }

  getTeamProjects(companyId = 6, teamId = 0){
    return this.http.get(backendUrl + `company/${companyId}/teams/${teamId}/projects`);
  }

}
