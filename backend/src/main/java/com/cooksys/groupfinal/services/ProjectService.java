package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.CreateProjectRequestDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;

public interface ProjectService {

    ProjectDto editProject(ProjectRequestDto projectRequestDto);

    ProjectDto createProject(CreateProjectRequestDto createProjectRequestDto);
}
