package org.tjss.humanresourcemanagementsystem.payload.request;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;

public class SkillsRequest {
	@NotBlank
	private Integer idEmployee;
	
	@NotBlank
	private Set<String> skills;
	
	@NotBlank
	private String imageName;

	public SkillsRequest(@NotBlank Integer idEmployee, @NotBlank Set<String> skills, @NotBlank String imageName) {
		super();
		this.idEmployee = idEmployee;
		this.skills = skills;
		this.imageName = imageName;
	}

	public Integer getIdEmployee() {
		return idEmployee;
	}

	public void setIdEmployee(Integer idEmployee) {
		this.idEmployee = idEmployee;
	}

	public Set<String> getSkills() {
		return skills;
	}

	public void setSkills(Set<String> skills) {
		this.skills = skills;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	

	}

	

	
	
	
	

	

