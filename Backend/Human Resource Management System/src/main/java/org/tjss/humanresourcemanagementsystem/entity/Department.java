package org.tjss.humanresourcemanagementsystem.entity;

import jakarta.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name= "Departments")
public class Department {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name= "ID_DEPARTMENT")
	public Integer idDepartment;

	
	@Column(name= "DEPARTMENT_NAME")
	public String departmentName;
	
	
	

}
