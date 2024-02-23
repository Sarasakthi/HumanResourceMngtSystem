package org.tjss.humanresourcemanagementsystem.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tjss.humanresourcemanagementsystem.entity.Department;
import org.tjss.humanresourcemanagementsystem.entity.ERole;
import org.tjss.humanresourcemanagementsystem.entity.Employee;
import org.tjss.humanresourcemanagementsystem.entity.Role;
import org.tjss.humanresourcemanagementsystem.entity.User;
import org.tjss.humanresourcemanagementsystem.payload.request.SignupRequest;
import org.tjss.humanresourcemanagementsystem.payload.request.UpdatePasswordRequest;
import org.tjss.humanresourcemanagementsystem.payload.response.MessageResponse;
import org.tjss.humanresourcemanagementsystem.repository.RoleRepository;
import org.tjss.humanresourcemanagementsystem.repository.UserRepository;
import org.tjss.humanresourcemanagementsystem.service.EmployeeService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	@Autowired
	EmployeeService employeeService;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

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
			return new ResponseEntity<>(depts, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	/*
	 * @PostMapping("/add")
	 * 
	 * @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<Employee>
	 * addingEmployee(@RequestBody Employee employee) {
	 * 
	 * try { int a = employeeService.addCredentials(employee); Employee emp =
	 * employeeService.addingEmployee(employee);
	 * 
	 * return new ResponseEntity<>(emp, HttpStatus.CREATED); } catch (Exception e) {
	 * return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); } }
	 */

	@PostMapping("/add")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> registerUser(@Valid @RequestBody Employee employee) {
	
		String username = employee.getFirstname();
		if (userRepository.existsByUsername(employee.getFirstname())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: " + username + " is already taken!"));
		}

		if (userRepository.existsByEmail(employee.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(employee.getFirstname(), employee.getEmail(), encoder.encode("newemployee"));
		//User user = new User(employee.getFirstname(), employee.getEmail(), "newemployee");

		Set<String> strRoles = null;
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		Employee emp = employeeService.addingEmployee(employee);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
	
	//Add admin in DB
	@PostMapping("/addAdmin")
	//@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> registerAdmin(@Valid @RequestBody SignupRequest signUpRequest) {
	
		String username = signUpRequest.getUsername();
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: " + username + " is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(), encoder.encode(signUpRequest.getPassword()));
		//User user = new User(employee.getFirstname(), employee.getEmail(), "newemployee");

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		//Employee emp = employeeService.addingEmployee(employee);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	@GetMapping("/employees")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<Employee>> getAllEmployees() {
		try {
			List<Employee> employees = new ArrayList<>();
			employees = employeeService.getAllEmployees();
			return new ResponseEntity<>(employees, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/search/{searchword}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<Employee>> getEmployees(@PathVariable("searchword") String searchword) {
		try {
			List<Employee> employees = new ArrayList<>();
			employees = employeeService.getEmployees(searchword);
			return new ResponseEntity<>(employees, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	/* updating employee details */
	@PostMapping("/updateEmployee/{idEmployee}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Employee> updateEmployee(@PathVariable("idEmployee") Integer idEmployee,
			@RequestBody Employee employee) {
		try {
			Employee emp = employeeService.updateEmployee(employee.department, employee.position, employee.reportingto,
					idEmployee);
			return new ResponseEntity<>(emp, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/* soft delete employee */
	
	@PostMapping("/delete/{idEmployee}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Employee> deleteEmployee(@PathVariable("idEmployee") Integer idEmployee) {
		try {
			Employee emp = employeeService.deleteEmployee(idEmployee);
			return new ResponseEntity<>(emp, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/updatePassword")
	//@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> updateNewPassword(@Valid @RequestBody UpdatePasswordRequest request) {
		int returnValue = 0;
		System.out.println("Entered into update - 1");
		Employee emp = employeeService.validateEmployee(request.getEmail());
		System.out.println("Entered into update - 2");
		System.out.println("Date of birth from DB " + emp.getDateofbirth());
		System.out.println("Date of birth from request " + request.getDateofbirth());
		
		System.out.println("New password from request " + request.getNewPassword());
		
		if(request.getDateofbirth().compareTo(emp.getDateofbirth()) == 0) {
		returnValue = userRepository.updatePassword(encoder.encode(request.getNewPassword()),request.getEmail());
		 System.out.println("REturn value from Database" + returnValue);
		}
		
		return ResponseEntity.ok(new MessageResponse("Password updated successfully!"));
	}
	
	
	@GetMapping("/getPendingApproval")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<Employee>> getSkillsToApprove() {
		try {

			List<Employee> empl = employeeService.getSkillsToApprove();
			return new ResponseEntity<>(empl, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}