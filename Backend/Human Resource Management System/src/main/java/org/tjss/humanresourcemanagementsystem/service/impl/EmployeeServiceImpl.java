package org.tjss.humanresourcemanagementsystem.service.impl;

import lombok.RequiredArgsConstructor;
import java.text.DateFormat;  
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.tjss.humanresourcemanagementsystem.entity.Department;
import org.tjss.humanresourcemanagementsystem.entity.Employee;
import org.tjss.humanresourcemanagementsystem.repository.DepartmentsRepository;
import org.tjss.humanresourcemanagementsystem.repository.EmployeeRepository;
import org.tjss.humanresourcemanagementsystem.service.EmployeeService;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
	//@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date; 
	@Autowired
	public EmployeeRepository employeeRepository;

	@Autowired
	public DepartmentsRepository departmentsRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public Employee addingEmployee(Employee employee) {
		Employee emp = new Employee();
		emp.setFirstname(employee.getFirstname());
		emp.setLastname(employee.getLastname());
		emp.setEmail(employee.getEmail());
		emp.setDateofjoining(employee.getDateofjoining());
		emp.setDateofbirth(employee.getDateofbirth());
		emp.setDepartment(employee.getDepartment());
		emp.setPosition(employee.getPosition());
		emp.setReportingto(employee.getReportingto());
		emp.setActive(true);
		//LocalDate newDate = LocalDate.parse(emp.getDateofjoining().toString());
		//System.out.println("new dateofjoining" + newDate);
		System.out.println("date from react" + employee.getDateofjoining());
		System.out.println("date of joining" + emp.getDateofjoining());
		return employeeRepository.save(emp);
	}

	@Override
	public List<Employee> getAllManagers(String position) {
		List<Employee> emp = employeeRepository.getAllManagers(position);
		return emp;
	}

	@Override
	public List<Department> getAllDepartments() {
		List<Department> depts = departmentsRepository.findAll();
		return depts;
	}

	@Override
	public List<Employee> getAllEmployees() {
		List<Employee> employees = employeeRepository.findAll();
		return employees;
	}

	@Override
	public List<Employee> getEmployees(String searchword) {

		return employeeRepository.getEmployees(searchword);
	}

	@Override
	public List<Employee> getSelectedEmployees(Integer[] idEmployees) {

		return employeeRepository.getSelectedEmployees(idEmployees);
	}

	@Override
	public Employee updateEmployee(String department, String position, String reporting_to, Integer idEmployee) {
		employeeRepository.updateEmployee(department, position, reporting_to, idEmployee);
		Employee emp = employeeRepository.findEmployee(idEmployee);
		return emp;
	}

	@Override
	public Employee deleteEmployee(Integer idEmployee) {
		employeeRepository.deleteEmployee(idEmployee);
		Employee emp = employeeRepository.findEmployee(idEmployee);
		return emp;
	}

	@Override
	public int addCredentials(Employee employee) {
		String password =  passwordEncoder.encode("newemployee");
		return  employeeRepository.addCredentials(employee.email,password,employee.firstname);
		
		
	}
}
