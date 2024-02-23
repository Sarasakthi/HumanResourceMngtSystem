package org.tjss.humanresourcemanagementsystem.service.impl;

import lombok.RequiredArgsConstructor;
import java.text.DateFormat;  
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.io.IOException;
import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.tjss.humanresourcemanagementsystem.entity.Department;
import org.tjss.humanresourcemanagementsystem.entity.Employee;
import org.tjss.humanresourcemanagementsystem.entity.ImageData;
import org.tjss.humanresourcemanagementsystem.entity.Technology;
//import org.tjss.humanresourcemanagementsystem.entity.TempSkills;
import org.tjss.humanresourcemanagementsystem.repository.DepartmentsRepository;
import org.tjss.humanresourcemanagementsystem.repository.EmployeeRepository;
import org.tjss.humanresourcemanagementsystem.repository.StorageRepository;
import org.tjss.humanresourcemanagementsystem.repository.TechnologyRepository;
//import org.tjss.humanresourcemanagementsystem.repository.TempSkillsRepository;
import org.tjss.humanresourcemanagementsystem.service.EmployeeService;
import org.tjss.humanresourcemanagementsystem.utils.ImageUtils;

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
	
	@Autowired
	 TechnologyRepository technologyRepository;
	
	@Autowired
    private StorageRepository storagerepository;
	
	//@Autowired
	//TempSkillsRepository tempSkillsRepository;

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
		emp.setSkills(null);
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
	int returnValue = 	employeeRepository.deleteEmployee(idEmployee);
		Employee emp = employeeRepository.findEmployee(idEmployee);
		return emp;
	}

	

	@Override
	public Employee validateEmployee(String email) {
		
		return  employeeRepository.findByEmail(email);
		  
	}

	@Override
	public Employee findEmployee(String email) {
		Employee emp = employeeRepository.findEmployee(email); 
		return emp;
	}

	@Override
	public List<Technology> getAllTechnologies() {
		List<Technology> tech = technologyRepository.findAll();
		return tech;
	}

	@Override
	public Employee submitSkillsToHR( Integer idEmployee,Set<String>skills, String imageName) {
		//int returnValue = employeeRepository.insertSkills(emp.getIdEmployee(),emp.getSkills());
		Employee empl = employeeRepository.findEmployee(idEmployee);
		
		empl.setSkills(skills);
		empl.setImageName(imageName);
		Employee empSkills = employeeRepository.save(empl);
		return empSkills;
	}

	@Override
	public List<Employee> getSkillsToApprove() {
	List<Employee> emp =employeeRepository.findAll();
		return emp;
	}

	
	public ImageData uploadImage(MultipartFile file) throws IOException {

        ImageData imageData = storagerepository.save(ImageData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtils.compressImage(file.getBytes())).build());
       /* if (imageData != null) {
            return "file uploaded successfully : " + file.getOriginalFilename();
        }
        return null;*/
        return imageData;
        
    }

    public byte[] downloadImage(String fileName){
        Optional<ImageData> dbImageData = storagerepository.findByName(fileName);
        byte[] images=ImageUtils.decompressImage(dbImageData.get().getImageData());
        return images;
    }
	/*@Override
	public int submitSkillsToHR(String[] skills, String email) {
		int returnValue = tempSkillsRepository.save(skills,email);
				return returnValue;
	}*/

/*	@Override
	public List<TempSkills> testinsertedvalue(String email) {
		//tempSkillsRepository.findAll();
		//tempSkillsRepository.getAll().forEach(System.out::println);
		return tempSkillsRepository.findAll();
	}*/

	
	
}
