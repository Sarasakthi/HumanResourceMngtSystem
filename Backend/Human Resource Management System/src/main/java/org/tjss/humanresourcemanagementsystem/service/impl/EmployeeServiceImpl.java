package org.tjss.humanresourcemanagementsystem.service.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.io.IOException;
import java.sql.Date;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.tjss.humanresourcemanagementsystem.entity.Department;
import org.tjss.humanresourcemanagementsystem.entity.Employee;
import org.tjss.humanresourcemanagementsystem.entity.ImageData;
import org.tjss.humanresourcemanagementsystem.entity.Technology;
import org.tjss.humanresourcemanagementsystem.entity.User;
//import org.tjss.humanresourcemanagementsystem.entity.TempSkills;
import org.tjss.humanresourcemanagementsystem.repository.DepartmentsRepository;
import org.tjss.humanresourcemanagementsystem.repository.EmployeeRepository;
import org.tjss.humanresourcemanagementsystem.repository.StorageRepository;
import org.tjss.humanresourcemanagementsystem.repository.TechnologyRepository;
import org.tjss.humanresourcemanagementsystem.repository.UserRepository;
//import org.tjss.humanresourcemanagementsystem.repository.TempSkillsRepository;
import org.tjss.humanresourcemanagementsystem.service.EmployeeService;
import org.tjss.humanresourcemanagementsystem.utils.ImageUtils;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    // @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date;
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

    @Autowired
    private UserRepository userrepository;

    @PersistenceContext
    private EntityManager entityManager;

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
        // emp.setSkills(null);
        // emp.setImageId(null);
        // emp.setSkillsApprove(false);
        // emp.setPermanentSkills(null);
        // LocalDate newDate = LocalDate.parse(emp.getDateofjoining().toString());
        // System.out.println("new dateofjoining" + newDate);
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
        Employee emp = employeeRepository.findEmployeeById(idEmployee);
        return emp;
    }

    @Override
    public Employee deleteEmployee(Integer idEmployee) {
        int returnValue = employeeRepository.deleteEmployee(idEmployee);
        Employee emp = employeeRepository.findEmployeeById(idEmployee);
        return emp;
    }

    @Override
    public Employee validateEmployee(String email) {

        return employeeRepository.findByEmail(email);

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
    public Employee submitSkillsToHR(Integer idEmployee, Set<String> skills, Integer imageId) {

        System.out.println("Entered into service - 1");

        Employee empl = employeeRepository.findEmployeeById(idEmployee);

        System.out.println("Printing employee" + empl);

        System.out.println("employee id" + empl.getIdEmployee());

        System.out.println("skills from frontend " + skills);


        List<Boolean> approval = new ArrayList<>();
        boolean newSkills = empl.getSkills().addAll(skills);
        System.out.println("Employee skills" + empl.getSkills());

        for (int i = 0; i < skills.size(); i++) {
            approval.add(false);
        }

        Employee emp = new Employee(empl.getIdEmployee(), empl.getFirstname(), empl.getLastname(), empl.getEmail(),
                empl.getDateofjoining(), empl.getDateofbirth(), empl.department, empl.getPosition(),
                empl.getReportingto(), true, empl.getSkills(), imageId,false);

        System.out.println("skills " + emp.getSkills());
        System.out.println("after constructor" + emp);
        return employeeRepository.save(emp);


    }

    @Override
    public List<Employee> getSkillsToApprove() {
        List<Employee> emp = employeeRepository.findEmployeesToApproveDocAndSkills();
        return emp;
    }

    public ImageData uploadImage(MultipartFile file) throws IOException {

        ImageData imageData = storagerepository
                .save(ImageData.builder().name(file.getOriginalFilename()).type(file.getContentType())
                        .imageData(ImageUtils.compressImage(file.getBytes())).approveImage(false).build());

        return imageData;

    }

    public byte[] downloadImage(String fileName) {
        Optional<ImageData> dbImageData = storagerepository.findByName(fileName);
        byte[] images = ImageUtils.decompressImage(dbImageData.get().getImageData());
        return images;
    }

    @Override
    public List<ImageData> getSelectedImages(Integer[] idImages) {
        List<ImageData> images = storagerepository.findById(idImages);
        return images;
    }

    @Override
    public Employee getEmployee(Integer idEmployee) {
        Employee emp = employeeRepository.findEmployeeById(idEmployee);
        return emp;
    }

    @Override
    public int approveSubmittedDocument(Integer imageId) {
        int returnValue = storagerepository.approveDocument(imageId);
        return returnValue;

    }

    @Override
    public int approveSkills(Integer idEmployee) {
        int returnValue = employeeRepository.approveSkills(idEmployee);
        return returnValue;
    }



    @Override
    public Employee waitingMessage(Integer idEmployee) {
        System.out.println("idEmployee waiting for approval" + idEmployee);
        Employee empl = employeeRepository.findEmployeeById(idEmployee);
        User user = userrepository.findUser(idEmployee);
        System.out.println("skills size" + empl.getSkills().size());
        System.out.println("image id" + empl.getImageId());
        ImageData image = storagerepository.findByIdForWaitingMessage(empl.getImageId());
        if (image == null) {
            System.out.println("image empty from DB");
        }
        System.out.println("image approved or not" + image.isApproveImage());
        if ( ((empl.getSkills().size() ) > (user.getPermanentSkills().size()) )&& (image.isApproveImage() == false)) {
            System.out.println("newly added skill size " +( empl.getSkills().size() - user.getPermanentSkills().size()));
            return empl;
        }
        else
            return null;
    }

    @Override
    public User updatePermanentSkills(Employee employee) {
        System.out.println("reached service");
        Employee emp = employeeRepository.findEmployeeById(employee.getIdEmployee());
        System.out.println("Printing Employee - " + emp);
        User user = userrepository.findUser(employee.getIdEmployee());
        System.out.println("Printing User - " + user);

        if (emp != null && user != null) {
            Set<String> permanentSkills = new HashSet<>(emp.getSkills());
            System.out.println("Printing permanentSkills - 1 - " + permanentSkills);
            user.setPermanentSkills(permanentSkills);
            System.out.println("Printing permanentSkills - 2 - " + user.getPermanentSkills());
            userrepository.save(user);
            System.out.println("Printing user - " + userrepository.findUser(employee.getIdEmployee()));
        }

        int returnValue = employeeRepository.approveSkills(employee.getIdEmployee());
        System.out.println("Update query return value - " + returnValue );
        return userrepository.findUser(employee.getIdEmployee());
    }



    @Override
    public Optional<ImageData> checkImageUpdate(Integer imageId) {
        Optional<ImageData> image = storagerepository.findById(imageId);
        return image;
    }

   @Override
    public User getPermanentSkillsToDisplay(Integer idEmployee) {
        User user = userrepository.findUser(idEmployee);
        return user;
    }

    @Override
    public int denySubmittedDocument(Integer idEmployee) {
        int returnValue = employeeRepository.updateDenyStatus(idEmployee);
        return returnValue;
    }

    @Override
    public int deleteUploadedImage(String name) {
        System.out.println("reached employee service for delete image");
        int returnValue = storagerepository.deleteImage(name);
        System.out.println("returnValue in service" + returnValue);
        return returnValue;
    }

    @Override
    public Optional<ImageData> findImageNameAlreadyExistsOrNot(MultipartFile file) {
        Optional<ImageData> image = storagerepository.findByName(file.getOriginalFilename());
        if(image.isEmpty())
        return Optional.empty();
        else
        return image;
    }

}

 /* @Override
    public Employee getSkillsToDisplay(Integer idEmployee) {

        Employee empl = employeeRepository.findEmployeeById(idEmployee);
        // System.out.println("finding permanent skiils to show in users profile" +
        // empl.getPermanentSkills());
        ImageData image = storagerepository.findByIdForApproval(empl.getImageId());
        // if(image == null) {System.out.println("image empty");}
        //Set<Boolean> approve = empl.getSkillsApproveStatus();
        //check what are all the skills are true
        if (image.isApproveImage() == true) {
            Employee emp = employeeRepository.getSkillsToDispaly(idEmployee);
            return emp;
        } else {
            return null;
        }
    }*/
/* /*   Optional<User> user = userrepository.findUser(employee.getIdEmployee());
        System.out.println("getSkills()- " + employee.getSkills());
        System.out.println("printing user" + user);
        System.out.println("permanent skill - " + user.get().getPermanentSkills());

        // converting set into array

	/*	Set<String> skills = employee.getSkills();
		String[] arrayOfString = new String[skills.size()];
		int index = 0;
		for (String str : skills)
			arrayOfString[index++] = str;

		System.out.println("arrayOfString" + arrayOfString.toString());*/

     /*   if (user.get().getPermanentSkills().size() == 0) {
            System.out.println("inside if");
            User newUser = new User(user.get().getId(), user.get().getUsername(), user.get().getEmail(),
                    user.get().getPassword(), user.get().getRoles(), employee.getSkills());
            System.out.println("printing user in if block - " + newUser);

            return userrepository.save(newUser);
            //return userrepository.findUser(employee.getIdEmployee());
        } else {
            System.out.println("inside else");
            System.out.println("per skill size  in else block- " + user.get().getPermanentSkills());
            System.out.println("getSkills()- else block " + employee.getSkills());
            boolean newSkills = user.get().getPermanentSkills().addAll(employee.getSkills());
            System.out.println("boolean result - " + newSkills);
            User newUser = new User(user.get().getId(), user.get().getUsername(), user.get().getEmail(),
                    user.get().getPassword(), user.get().getRoles(), user.get().getPermanentSkills());
            System.out.println("printing user  in else block- " + newUser);

            return userrepository.save(newUser);
            //return userrepository.findUser(employee.getIdEmployee());
        }*/

//@Override
  /*  @Transactional
    public Employee updatePermanentSkills(Employee employee) {
        System.out.println("reached service");

        Set<String> skills = employee.getSkills();

        //List<Boolean> approval = new ArrayList<>();
        Employee empl = entityManager.find(Employee.class, employee.getIdEmployee());
        Set<String> tempSkills = empl.getSkills();
        List<Boolean> approval = empl.getSkillsApproveStatus();

        System.out.println("tempSkills" + tempSkills);
        System.out.println("approval" + approval);

        //for (int i = 0; i < skills.size(); i++) {
        //int i = 0;
        //for (String item : skills) {
        for (int i = 0; i < skills.size(); i++){
            System.out.println("Skills length " + skills.size());
            //System.out.println("Updating item is " + i + " - " + item);
            //approval.add(true);
            //employeeRepository.updatePermanentSkills(approval, employee.getIdEmployee());
            //tempSkills.remove(tempSkills.iterator().next());

            tempSkills.clear();
            tempSkills.add("test_" + i);//item);
            approval.clear();
            approval.set(i, true);
            i++;
            System.out.println("Printing approval" + approval);
        }

        entityManager.merge(empl);

        System.out.println("skills " + skills);
        //employeeRepository.updatePermanentSkills(employee.getIdEmployee());
        //int returnValue = employeeRepository.updatePermanentSkills(approval, employee.getIdEmployee());

        //System.out.println("updated approve skills status");
        //System.out.println("updated return value" + returnValue);
        //Employee emp = new Employee(employee.getIdEmployee(), skills, approval);
        //employeeRepository.save(emp);
        //employeeRepository.delete(emp);
        //System.out.println(" deleting skills - IDEMPLOYEE " + employee.getIdEmployee());
        //employeeRepository.deleteSkills(employee.getIdEmployee());
        //employeeRepository.insertSkills(employee.getIdEmployee(), skills);
        //employeeRepository.save(emp);
        //employeeRepository.updateChildFields(employee.getIdEmployee());


        return employeeRepository.findEmployeeById(employee.getIdEmployee());
    }*/
