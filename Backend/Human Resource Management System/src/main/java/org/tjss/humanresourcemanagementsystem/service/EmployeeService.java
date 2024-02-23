package org.tjss.humanresourcemanagementsystem.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;
import org.tjss.humanresourcemanagementsystem.entity.Department;
import org.tjss.humanresourcemanagementsystem.entity.Employee;
import org.tjss.humanresourcemanagementsystem.entity.ImageData;
import org.tjss.humanresourcemanagementsystem.entity.Technology;
//import org.tjss.humanresourcemanagementsystem.entity.TempSkills;

public interface EmployeeService {

	public Employee addingEmployee(Employee employee);

	public List<Employee> getAllManagers(String position);

	public List<Department> getAllDepartments();

	public List<Employee> getAllEmployees();

	public List<Employee> getEmployees(String searchword);

	public List<Employee> getSelectedEmployees(Integer[] idEmployees);

	public  Employee updateEmployee(String department, String position, String reporting_to, Integer idEmployee);

	public Employee deleteEmployee(Integer idEmployee);

	

	public Employee validateEmployee(String email);

	public Employee findEmployee(String email);

	public List<Technology> getAllTechnologies();

	public Employee submitSkillsToHR(Integer idEmployee,Set<String> skills, String imageName);

	public List<Employee> getSkillsToApprove();
	
	 public ImageData uploadImage(MultipartFile file) throws IOException;
	 
	 public byte[] downloadImage(String fileName);

//	public int submitSkillsToHR(String[] skills, String email);

	//public List<TempSkills> testinsertedvalue(String email);

}
