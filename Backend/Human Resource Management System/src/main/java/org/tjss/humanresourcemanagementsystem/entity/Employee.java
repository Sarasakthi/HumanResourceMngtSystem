package org.tjss.humanresourcemanagementsystem.entity;

import java.sql.Date;

//import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Employees_Details")
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_EMPLOYEE")
	public Integer idEmployee;

	@Column(name = "FIRST_NAME")
	public String firstname;

	@Column(name = "LAST_NAME")
	public String lastname;

	@Column(name = "EMAIL")
	public String email;

	// @JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name = "DATE_OF_JOINING")
	public Date dateofjoining;

	@Column(name = "DATE_OF_BIRTH")
	public Date dateofbirth;

	@Column(name = "DEPARTMENT")
	public String department;

	@Column(name = "POSITION")
	public String position;

	@Column(name = "REPORTING_TO")
	public String reportingto;

	@Column(name = "ACTIVE")
	public boolean active;

	@ElementCollection
	@CollectionTable(name = "temp_skills",
	joinColumns = @JoinColumn(name = "id_employee"))
	private Set<String> skills;
	
	@Column(name = "image_name")
	private String imageName;
	

	public Employee(Integer idEmployee, Set<String> skills) {
		super();
		this.idEmployee = idEmployee;
		this.skills = skills;
	}

	public Employee() {
		
	}

	public Employee(Integer idEmployee, String firstname, String lastname, String email, Date dateofjoining,
			Date dateofbirth, String department, String position, String reportingto, boolean active,
			Set<String> skills) {
		super();
		this.idEmployee = idEmployee;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.dateofjoining = dateofjoining;
		this.dateofbirth = dateofbirth;
		this.department = department;
		this.position = position;
		this.reportingto = reportingto;
		this.active = active;
		this.skills = skills;
	}

	public Employee(Integer idEmployee, String firstname, String lastname, String email, Date dateofjoining,
			Date dateofbirth, String department, String position, String reportingto, boolean active,
			Set<String> skills, String imageName) {
		super();
		this.idEmployee = idEmployee;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.dateofjoining = dateofjoining;
		this.dateofbirth = dateofbirth;
		this.department = department;
		this.position = position;
		this.reportingto = reportingto;
		this.active = active;
		this.skills = skills;
		this.imageName = imageName;
	}
	

}
