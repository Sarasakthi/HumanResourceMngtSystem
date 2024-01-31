package org.tjss.humanresourcemanagementsystem.controller;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.tjss.humanresourcemanagementsystem.entity.Department;
import org.tjss.humanresourcemanagementsystem.entity.Employee;
import org.tjss.humanresourcemanagementsystem.service.EmployeeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;

	@PostMapping("/add")
	public ResponseEntity<Employee> addingEmployee(@RequestBody Employee employee) {
		// @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
		try {
			Employee emp = employeeService.addingEmployee(employee);
			return new ResponseEntity<>(emp, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/managers/{position}")
	public ResponseEntity<List<Employee>> getAllManagers(@PathVariable("position") String position ) {
		try {
			List<Employee> employees = new ArrayList<>();
			employees = employeeService.getAllManagers(position);
			return new ResponseEntity<>(employees,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	
	@GetMapping("/departments")
	public ResponseEntity<List<Department>> getAllDepartments() {
		try {
			List<Department> depts = new ArrayList<>();
			depts = employeeService.getAllDepartments();
			return new ResponseEntity<>(depts,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	@GetMapping("/employees")
	public ResponseEntity<List<Employee>> getAllEmployees() {
		try {
			List<Employee> employees = new ArrayList<>();
			employees = employeeService.getAllEmployees();
			return new ResponseEntity<>(employees,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	
	@GetMapping("/search/{searchword}")
	public ResponseEntity<List<Employee>> getEmployees(@PathVariable("searchword") String searchword ) {
		try {
			List<Employee> employees = new ArrayList<>();
			employees = employeeService.getEmployees(searchword);
			return new ResponseEntity<>(employees,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	
	@GetMapping("/searchid/{idEmployees}")
	public ResponseEntity<List<Employee>> getSelectedEmployees(@PathVariable Integer[] idEmployees) {
		try {
			List<Employee> employees = new ArrayList<>();
			employees = employeeService.getSelectedEmployees(idEmployees);
			return new ResponseEntity<>(employees,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}


