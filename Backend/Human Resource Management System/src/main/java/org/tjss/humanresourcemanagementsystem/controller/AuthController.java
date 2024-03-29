package org.tjss.humanresourcemanagementsystem.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException.BadRequest;
import org.tjss.humanresourcemanagementsystem.entity.ERole;
import org.tjss.humanresourcemanagementsystem.entity.Employee;
import org.tjss.humanresourcemanagementsystem.entity.Role;
import org.tjss.humanresourcemanagementsystem.entity.User;
import org.tjss.humanresourcemanagementsystem.payload.request.LoginRequest;
import org.tjss.humanresourcemanagementsystem.payload.request.SignupRequest;
import org.tjss.humanresourcemanagementsystem.payload.response.JwtResponse;
import org.tjss.humanresourcemanagementsystem.payload.response.MessageResponse;
import org.tjss.humanresourcemanagementsystem.repository.RoleRepository;
import org.tjss.humanresourcemanagementsystem.repository.UserRepository;
import org.tjss.humanresourcemanagementsystem.security.jwt.JwtUtils;
import org.tjss.humanresourcemanagementsystem.security.services.UserDetailsImpl;
import org.tjss.humanresourcemanagementsystem.service.EmployeeService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	EmployeeService employeeService;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());
		Employee emp = employeeService.findEmployee(userDetails.getEmail());
		System.out.println("Employee from DB " + emp);
		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(),
				userDetails.getEmail(), roles, emp));

	}

	/*
	 * @PostMapping("/signup") public ResponseEntity<?>
	 * registerUser(@Valid @RequestBody SignupRequest signUpRequest) { if
	 * (userRepository.existsByUsername(signUpRequest.getUsername())) { return
	 * ResponseEntity.badRequest().body(new
	 * MessageResponse("Error: Username is already taken!")); }
	 * 
	 * if (userRepository.existsByEmail(signUpRequest.getEmail())) { return
	 * ResponseEntity.badRequest().body(new
	 * MessageResponse("Error: Email is already in use!")); }
	 * 
	 * // Create new user's account User user = new
	 * User(signUpRequest.getUsername(), signUpRequest.getEmail(),
	 * encoder.encode(signUpRequest.getPassword()));
	 * 
	 * Set<String> strRoles = signUpRequest.getRole(); Set<Role> roles = new
	 * HashSet<>();
	 * 
	 * if (strRoles == null) { Role userRole =
	 * roleRepository.findByName(ERole.ROLE_USER) .orElseThrow(() -> new
	 * RuntimeException("Error: Role is not found.")); roles.add(userRole); } else {
	 * strRoles.forEach(role -> { switch (role) { case "admin": Role adminRole =
	 * roleRepository.findByName(ERole.ROLE_ADMIN) .orElseThrow(() -> new
	 * RuntimeException("Error: Role is not found.")); roles.add(adminRole);
	 * 
	 * break; case "mod": Role modRole =
	 * roleRepository.findByName(ERole.ROLE_MODERATOR) .orElseThrow(() -> new
	 * RuntimeException("Error: Role is not found.")); roles.add(modRole);
	 * 
	 * break; default: Role userRole = roleRepository.findByName(ERole.ROLE_USER)
	 * .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
	 * roles.add(userRole); } }); }
	 * 
	 * user.setRoles(roles); userRepository.save(user);
	 * 
	 * return ResponseEntity.ok(new
	 * MessageResponse("User registered successfully!")); }
	 */
}
