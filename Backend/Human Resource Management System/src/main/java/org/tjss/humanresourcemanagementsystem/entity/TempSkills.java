/*package org.tjss.humanresourcemanagementsystem.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name= "temp_skills")
public class TempSkills {
	
	@Id
	@GeneratedValue(generator = "skills_gen",strategy = GenerationType.IDENTITY)
	@SequenceGenerator(name = "skills_gen",sequenceName = "skills_seq",initialValue = 100,allocationSize = 1)
	@Column(name= "id_temp_skills")
	private Integer idSkills;
	
	@Column(name= "skills")
	private List<String>  skills;
	
	@Column(name= "email")
	private String email;
	

}*/
