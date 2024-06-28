import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Project from 'src/types/Project';
import ProjectRequestDto from 'src/types/ProjectRequestDto';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit{

  constructor(private userService: UserService) {
  }


  ngOnInit(): void {
    this.editProjectForm.controls['name'].setValue(this.project?.name);
  }

  @Output() close = new EventEmitter<void>();
  @Output() editedProject = new EventEmitter<Project | null>();

  @Input() project: Project | null = null;

  projectRequestDto: ProjectRequestDto = {
    active: true,
    name: "Hello",
    description: "Described",
    id: 8
  }


  closeBox() {
    this.close.emit();
  }

  async submit() {
    await this.editProject();
    this.editedProject.emit(this.project);
    this.close.emit();
  }

  editProjectForm: FormGroup = new FormGroup({
    name: new FormControl<string>("", [Validators.required, Validators.minLength(3)]),
    description: new FormControl<string>("", [Validators.required, Validators.minLength(5)]),
    active: new FormControl<boolean | null>(null, [Validators.required])
  })

  async editProject(){
    this.projectRequestDto.name = this.editProjectForm.controls['name'].value;
    this.projectRequestDto.description = this.editProjectForm.controls['description'].value;
    this.projectRequestDto.active = this.editProjectForm.controls['active'].value;
    console.log(this.projectRequestDto)
    if(this.project && this.project.id){
      this.projectRequestDto.id = this.project?.id;
      this.project = await firstValueFrom(this.userService.editProject(this.projectRequestDto));
    } else {
      alert("Please try again!")
    }


    // this.projectRequestDto.description = this.postProjectForm.controls['description'].value;
    // this.projectRequestDto.active = true;
    // this.projectRequestDto.teamId = 11;
    // this.project = await firstValueFrom(this.userService.postProject(this.projectRequestDto));
  }


}
