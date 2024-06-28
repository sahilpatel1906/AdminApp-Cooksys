package com.cooksys.groupfinal.services;

import java.util.Set;

import com.cooksys.groupfinal.dtos.*;

public interface CompanyService {

	Set<FullUserDto> getAllUsers(Long id);

	Set<AnnouncementDto> getAllAnnouncements(Long id);

	Set<TeamDto> getAllTeams(Long id);

	Set<ProjectDto> getAllProjects(Long companyId, Long teamId);

	AnnouncementDto addAnnouncement(Long id, AnnouncementRequestDto announcementRequestDto);

    TeamDto createTeam(Long id, TeamDto team);

    Set<ProjectDto> getActiveAndInactiveProjects(Long companyId, Long teamId);
}
