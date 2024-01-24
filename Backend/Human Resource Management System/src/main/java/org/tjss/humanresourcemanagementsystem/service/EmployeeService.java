package org.tjss.humanresourcemanagementsystem.service;

import java.util.List;

import org.tjss.humanresourcemanagementsystem.entity.Department;
import org.tjss.humanresourcemanagementsystem.entity.Employee;

public interface EmployeeService {

	public Employee addingEmployee(Employee employee);

	public List<Employee> getAllManagers(String position);

	public List<Department> getAllDepartments();

}
