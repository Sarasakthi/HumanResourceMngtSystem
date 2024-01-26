package org.tjss.humanresourcemanagementsystem.service.impl;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.tjss.humanresourcemanagementsystem.entity.Department;
import org.tjss.humanresourcemanagementsystem.entity.Employee;
import org.tjss.humanresourcemanagementsystem.repository.DepartmentsRepository;
import org.tjss.humanresourcemanagementsystem.repository.EmployeeRepository;
import org.tjss.humanresourcemanagementsystem.service.EmployeeService;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	public EmployeeRepository employeeRepository;

	@Autowired
	public DepartmentsRepository departmentsRepository;

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
		
		return  employeeRepository.getEmployees(searchword);
	}
}
