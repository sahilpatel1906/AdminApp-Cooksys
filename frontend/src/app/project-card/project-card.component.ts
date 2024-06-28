import { Component, EventEmitter, Input, Output } from '@angular/core';
import Project from 'src/types/Project';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {

  @Input() projects: Project[] = []
  @Output() editedProject = new EventEmitter<Project | null>();
  toggleCreate: boolean = false;
  currentProject: Project | null = null;

  editProject(project: Project){
    this.currentProject = project;
    this.toggleCreate = !this.toggleCreate;
  }

  modalOutsideClicked(event : any) {
    if(event.target.getAttribute('class') == "overlay"){
      this.toggleCreate = !this.toggleCreate;
    }
  }

  closeModal(){
    this.toggleCreate = !this.toggleCreate;
  }

  updateProject(project: Project | null){
    this.editedProject.emit(project);
  }

}
