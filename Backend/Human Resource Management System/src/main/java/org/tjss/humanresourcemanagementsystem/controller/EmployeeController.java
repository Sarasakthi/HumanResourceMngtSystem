package org.tjss.humanresourcemanagementsystem.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.tjss.humanresourcemanagementsystem.entity.Department;
import org.tjss.humanresourcemanagementsystem.entity.Employee;
import org.tjss.humanresourcemanagementsystem.entity.ImageData;
import org.tjss.humanresourcemanagementsystem.entity.Technology;
import org.tjss.humanresourcemanagementsystem.entity.User;
//import org.tjss.humanresourcemanagementsystem.entity.TempSkills;
import org.tjss.humanresourcemanagementsystem.payload.request.SkillsRequest;
import org.tjss.humanresourcemanagementsystem.payload.response.MessageResponse;
import org.tjss.humanresourcemanagementsystem.repository.EmployeeRepository;
import org.tjss.humanresourcemanagementsystem.service.EmployeeService;

import io.jsonwebtoken.lang.Arrays;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;

	@GetMapping("/getTechnologies")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<List<Technology>> getAlltechnologies() {
		try {
			List<Technology> techs = new ArrayList<>();
			techs = employeeService.getAllTechnologies();
			System.out.println("Techs from DB" + techs);
			return new ResponseEntity<>(techs, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PostMapping("/submitDocument")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> submitDocumentToHR(@RequestParam("File")MultipartFile file)  {
		try {
			System.out.println("reached employeeController");
			Optional<ImageData> image = employeeService.findImageNameAlreadyExistsOrNot(file);
			if(image.isEmpty() || (image == null)) {
				System.out.println("Printing image in employee controller" + image);

				ImageData uploadedImage = employeeService.uploadImage(file);
				System.out.println("uploadedImage" + uploadedImage);
				System.out.println("Finished upload image");
				return new ResponseEntity<>(uploadedImage, HttpStatus.OK);

			}
			else{
				return ResponseEntity.ok(new MessageResponse("Imagename already exists. Please submit with some other name!"));

			}
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	@PostMapping("/submitSkills")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> submitSkillsToHR(@RequestBody SkillsRequest skillsRequest)  {
		try {
				System.out.println("Entered into controller to submit skills");		
			Employee empl = employeeService.submitSkillsToHR(skillsRequest.getIdEmployee(), skillsRequest.getSkills(),skillsRequest.getImageId());
			return new ResponseEntity<>(empl, HttpStatus.OK); 
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	
	

	
	@GetMapping("/getPendingApproval")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<List<Employee>> getSkillsToApprove() {
		try {

			List<Employee> empl = employeeService.getSkillsToApprove();
			return new ResponseEntity<>(empl, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	/* Using check box to find array of employees */
	//We haven't used
	@GetMapping("/searchid/{idEmployees}")
	public ResponseEntity<List<Employee>> getSelectedEmployees(@PathVariable Integer[] idEmployees) {
		try {
			List<Employee> employees = new ArrayList<>();
			employees = employeeService.getSelectedEmployees(idEmployees);
			return new ResponseEntity<>(employees, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	
/*	@GetMapping("/skillsApproved/{idEmployee}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<Employee> getSkillsToDisplay(@PathVariable("idEmployee")Integer idEmployee) {
		try {

			Employee empl = employeeService.getSkillsToDisplay(idEmployee);
			return new ResponseEntity<>(empl, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}*/
	
	@GetMapping("/waitingForApproval/{idEmployee}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<Employee> waitingMessage(@PathVariable("idEmployee")Integer idEmployee) {
		try {
System.out.println("idEmployee"+idEmployee);
			Employee empl = employeeService.waitingMessage(idEmployee);
			return new ResponseEntity<>(empl, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/userProfileSkills/{idEmployee}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity <User> getPermanentSkillsToDisplayInUserProfile(@PathVariable("idEmployee")Integer idEmployee) {
		try {

			User user = employeeService.getPermanentSkillsToDisplay(idEmployee);
			return new ResponseEntity<>(user, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}


	@PostMapping("/deleteImage/{name}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity <?> deleteUploadedImage(@PathVariable("name")String name) {
		try {
			System.out.println("reached employee controller for deleteImage");
			 int returnValue = employeeService.deleteUploadedImage(name);
			System.out.println("return value in controller - " + returnValue);
			return ResponseEntity.ok(new MessageResponse("Uploaded image deleted"));
		} catch (Exception e) {
			return ResponseEntity.ok(new MessageResponse("Uploaded image not deleted!"));
		}

	}
}
