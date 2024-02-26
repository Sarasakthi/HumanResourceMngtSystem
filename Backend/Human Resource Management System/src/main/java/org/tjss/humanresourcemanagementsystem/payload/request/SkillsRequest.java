package org.tjss.humanresourcemanagementsystem.payload.request;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;

public class SkillsRequest {
	@NotBlank
	private Integer idEmployee;
	
	@NotBlank
	private Set<String> skills;
	
	@NotBlank
	private Integer imageId;

	public SkillsRequest(@NotBlank Integer idEmployee, @NotBlank Set<String> skills, @NotBlank Integer imageId) {
		super();
		this.idEmployee = idEmployee;
		this.skills = skills;
		this.imageId = imageId;
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

	public Integer getImageId() {
		return imageId;
	}

	public void setImageId(Integer imageId) {
		this.imageId = imageId;
	}

	
	

	}

	

	
	
	
	

	

