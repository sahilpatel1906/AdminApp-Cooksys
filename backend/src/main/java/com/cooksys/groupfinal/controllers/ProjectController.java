package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.CreateProjectRequestDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class ProjectController {
	
	private final ProjectService projectService;

	@PatchMapping
	public ProjectDto editProject(@RequestBody ProjectRequestDto projectRequestDto){
		return projectService.editProject(projectRequestDto);
	}

	@PostMapping
	public ProjectDto createProject(@RequestBody CreateProjectRequestDto createProjectRequestDto){
		return projectService.createProject(createProjectRequestDto);
	}

}
