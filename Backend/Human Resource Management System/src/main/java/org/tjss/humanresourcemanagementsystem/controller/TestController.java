package org.tjss.humanresourcemanagementsystem.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tjss.humanresourcemanagementsystem.entity.Department;
import org.tjss.humanresourcemanagementsystem.entity.Employee;
import org.tjss.humanresourcemanagementsystem.service.EmployeeService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	@Autowired
	EmployeeService employeeService;

	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}

	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/mod")
	@PreAuthorize("hasRole('MODERATOR')")
	public String moderatorAccess() {
		return "Moderator Board.";
	}

	@GetMapping("/managers/{position}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<Employee>> getAllManagers(@PathVariable("position") String position) {
		try {
			List<Employee> employees = new ArrayList<>();
			employees = employeeService.getAllManagers(position);
			return new ResponseEntity<>(employees, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	@GetMapping("/departments")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<Department>> getAllDepartments() {
		try {
			List<Department> depts = new ArrayList<>();
			depts = employeeService.getAllDepartments();
			return new ResponseEntity<>(depts,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	@PostMapping("/add")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Employee> addingEmployee(@RequestBody Employee employee) {
		// @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
		try {
			Employee emp = employeeService.addingEmployee(employee);
			return new ResponseEntity<>(emp, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/employees")
	@PreAuthorize("hasRole('ADMIN')")
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
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<Employee>> getEmployees(@PathVariable("searchword") String searchword ) {
		try {
			List<Employee> employees = new ArrayList<>();
			employees = employeeService.getEmployees(searchword);
			return new ResponseEntity<>(employees,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	/*updating employee details */
	@PostMapping("/updateEmployee/{idEmployee}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity <Employee> updateEmployee(@PathVariable("idEmployee") Integer idEmployee, @RequestBody Employee employee ) 
		 {
		try {
			Employee emp = employeeService.updateEmployee(employee.department,employee.position,employee.reportingto,idEmployee);
			return new ResponseEntity<>(emp, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	/* soft delete employee*/
	@PostMapping("/deleteEmployee/{idEmployee}")
	public ResponseEntity <Employee> deleteEmployee(@PathVariable("idEmployee") Integer idEmployee) 
		 {
		try {
			Employee emp = employeeService.deleteEmployee(idEmployee);
			return new ResponseEntity<>(emp, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
