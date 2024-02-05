package org.tjss.humanresourcemanagementsystem.service;

import java.util.List;
import java.util.Optional;

import org.tjss.humanresourcemanagementsystem.entity.Department;
import org.tjss.humanresourcemanagementsystem.entity.Employee;

public interface EmployeeService {

	public Employee addingEmployee(Employee employee);

	public List<Employee> getAllManagers(String position);

	public List<Department> getAllDepartments();

	public List<Employee> getAllEmployees();

	public List<Employee> getEmployees(String searchword);

	public List<Employee> getSelectedEmployees(Integer[] idEmployees);

	public  Employee updateEmployee(String department, String position, String reporting_to, Integer idEmployee);

	public Employee deleteEmployee(Integer idEmployee);

}
