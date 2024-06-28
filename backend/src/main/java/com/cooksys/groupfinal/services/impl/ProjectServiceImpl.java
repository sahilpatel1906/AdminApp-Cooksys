package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.CreateProjectRequestDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;
    private final TeamRepository teamRepository;

    @Override
    public ProjectDto editProject(ProjectRequestDto projectRequestDto) {
        if(projectRequestDto == null || projectRequestDto.getDescription() == null || projectRequestDto.getName() == null || projectRequestDto.getId() == 0){
            throw new BadRequestException("Please provide valid project details");
        }
        Optional<Project> projectOptional = projectRepository.findById(projectRequestDto.getId());
        if(projectOptional.isEmpty()) {
            throw new BadRequestException("No project found with the id: " + projectRequestDto.getId());
        }
        Project editProject =  projectOptional.get();
        editProject.setActive(projectRequestDto.isActive());
        editProject.setName(projectRequestDto.getName());
        editProject.setDescription(projectRequestDto.getDescription());
        return  projectMapper.entityToDto(projectRepository.saveAndFlush(editProject));
    }

    @Override
    public ProjectDto createProject(CreateProjectRequestDto createProjectRequestDto) {
        if(createProjectRequestDto == null || createProjectRequestDto.getDescription() == null || createProjectRequestDto.getName() == null || createProjectRequestDto.getTeamId() == 0){
            throw new BadRequestException("Please provide valid project details");
        }
        Optional<Team> teamOptional = teamRepository.findById(createProjectRequestDto.getTeamId());
        if(teamOptional.isEmpty()) {
            throw new BadRequestException("No team exists with id: " + createProjectRequestDto.getTeamId());
        }
        Project project = projectMapper.RequestDToToEntity(createProjectRequestDto);
        project.setTeam(teamOptional.get());
        return projectMapper.entityToDto(projectRepository.saveAndFlush(project));
    }
}
