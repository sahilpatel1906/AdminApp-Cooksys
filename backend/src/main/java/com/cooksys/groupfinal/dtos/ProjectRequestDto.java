package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ProjectRequestDto {

    private long id;

    private String name;

    private String description;

    private boolean active;
}
