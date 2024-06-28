package com.cooksys.groupfinal.mappers;

import java.util.Set;

import com.cooksys.groupfinal.dtos.CreateProjectRequestDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;
import org.mapstruct.Mapper;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.entities.Project;

@Mapper(componentModel = "spring", uses = { TeamMapper.class })
public interface ProjectMapper {
	
    Project RequestDToToEntity (CreateProjectRequestDto createProjectRequestDto);
	ProjectDto entityToDto(Project project);

    Set<ProjectDto> entitiesToDtos(Set<Project> projects);

}
