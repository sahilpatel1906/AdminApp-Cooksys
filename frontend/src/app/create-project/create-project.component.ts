import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/services/user.service';
import Project from 'src/types/Project';
import { firstValueFrom } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import CreateProjectRequestDto from 'src/types/CreateProjectRequestDto';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  @Output() close = new EventEmitter<void>();
  @Output() addProject = new EventEmitter<Project>();
  team: any = undefined;
  project: Project = {
    name: "",
    description: "",
    active: false
  }


  createProjectRequestDto: CreateProjectRequestDto = {
    active: true,
    name: "Hello",
    description: "Described",
    teamId: 11
  }

  closeBox() {
    this.close.emit();
  }

  constructor(private userService: UserService) {
    this.userService.selectedTeam.subscribe(selectedTeam => this.team = selectedTeam)
  }

  async submit() {

    await this.postProject();
    this.addProject.emit(this.project);
    this.close.emit();
  }


  async postProject(){
    this.createProjectRequestDto.name = this.postProjectForm.controls['name'].value;
    this.createProjectRequestDto.description = this.postProjectForm.controls['description'].value;
    this.createProjectRequestDto.active = true;
    this.createProjectRequestDto.teamId = this.team.id;
    this.project = await firstValueFrom(this.userService.postProject(this.createProjectRequestDto));
  }

  postProjectForm: FormGroup = new FormGroup({
    name: new FormControl<string>("", [Validators.required, Validators.minLength(3)]),
    description: new FormControl<string>("", [Validators.required, Validators.minLength(5)])
  })


}
