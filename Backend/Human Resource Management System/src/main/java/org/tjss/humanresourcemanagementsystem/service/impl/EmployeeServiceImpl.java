package org.tjss.humanresourcemanagementsystem.service.impl;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.tjss.humanresourcemanagementsystem.entity.Employee;
import org.tjss.humanresourcemanagementsystem.repository.EmployeeRepository;
import org.tjss.humanresourcemanagementsystem.service.EmployeeService;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	public EmployeeRepository employeeRepository;

	@Override
	public Employee addingEmployee(Employee employee) {
		Employee emp = new Employee();
		emp.setFirstname(employee.getFirstname());
		emp.setLastname(employee.getLastname());
		emp.setEmail(employee.getEmail());
		emp.setDateofjoining(employee.getDateofjoining());
		return employeeRepository.save(emp);
	}
}
