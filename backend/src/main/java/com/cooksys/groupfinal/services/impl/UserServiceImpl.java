package com.cooksys.groupfinal.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
  private final FullUserMapper fullUserMapper;
  private final BasicUserMapper basicUserMapper;
	private final CredentialsMapper credentialsMapper;
	
	private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }
	
	@Override
	public FullUserDto login(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        if (userToValidate.getStatus().equals("PENDING")) {
        	userToValidate.setStatus("JOINED");
        	userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
	}

    @Override
    public BasicUserDto addUser(UserRequestDto userRequestDto) {
        if (userRequestDto == null || userRequestDto.getProfile() == null || userRequestDto.getCredentials() == null || userRequestDto.getCompanyId() == 0) {
            throw new BadRequestException("Please provide the valid user information.");
        }
        if(userRequestDto.getProfile().getPhone() == null|| userRequestDto.getProfile().getFirstName() == null || userRequestDto.getProfile().getLastName() == null || userRequestDto.getProfile().getEmail() == null ) {
            throw new BadRequestException("Please provide the valid profile information.");
        }
        if(userRequestDto.getCredentials().getUsername() == null || userRequestDto.getCredentials().getPassword() == null) {
            throw new BadRequestException("Please provide the valid credentials information.");
        }
        Optional<Company> companyOptional = companyRepository.findById(userRequestDto.getCompanyId());
        if(companyOptional.isEmpty()){
            throw new BadRequestException("No company found with id: " + userRequestDto.getCompanyId());
        }
        User userToAdd = fullUserMapper.requestDtoToEntity(userRequestDto);
//        Set<Company> companies = userToAdd.getCompanies();
//        companies.add(companyOptional.get());
//        userToAdd.setCompanies(companies);
        userToAdd.setActive(true);
        User addedUser = userRepository.saveAndFlush(userToAdd);
        Company company = companyOptional.get();
        Set<User> employees = company.getEmployees();
        employees.add(addedUser);
        company.setEmployees(employees);
        companyRepository.saveAndFlush(company);
        return basicUserMapper.entityToBasicUserDto(userRepository.saveAndFlush(userToAdd));
    }


}
