package org.tjss.humanresourcemanagementsystem.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.tjss.humanresourcemanagementsystem.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

	//Find managers list to display in add employee form
	@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE POSITION =?1 AND ACTIVE = TRUE", nativeQuery = true)
	public List<Employee> getAllManagers(String position);

	//find employee using search word
	@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE (FIRST_NAME LIKE %?1%"
			+ " OR LAST_NAME LIKE %?1% OR email LIKE %?1% OR DEPARTMENT LIKE %?1% "
			+ "OR POSITION LIKE %?1% OR REPORTING_TO LIKE %?1%) AND ACTIVE = TRUE", nativeQuery = true)
	public  List<Employee> getEmployees(String searchword);
	
	//Finding all the employees
	@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE ACTIVE = TRUE AND POSITION NOT LIKE '%HR MANAGER%'AND DEPARTMENT NOT LIKE '%GLOBAL MANAGER%'", nativeQuery = true)
	public List<Employee> findAll();


	
	@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE ID_EMPLOYEE IN ?1", nativeQuery = true)
	public List<Employee> getSelectedEmployees(Integer[] idEmployees);

	@Modifying
	@Transactional
	@Query(value = "UPDATE EMPLOYEES_DETAILS SET DEPARTMENT=:department, POSITION=:position, REPORTING_TO=:reporting_to  WHERE ID_EMPLOYEE=:idEmployee", nativeQuery = true)
	public void updateEmployee(@Param("department")String department,@Param("position")String position,@Param("reporting_to")String reporting_to, @Param("idEmployee")Integer idEmployee);

	
	@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE ID_EMPLOYEE=:idEmployee AND ACTIVE = TRUE", nativeQuery = true)
	public Employee findEmployeeById(@Param("idEmployee")Integer idEmployee);

	@Modifying
	@Transactional
	@Query(value = "UPDATE EMPLOYEES_DETAILS SET ACTIVE = FALSE  WHERE ID_EMPLOYEE=:idEmployee", nativeQuery = true)
	public int deleteEmployee(@Param("idEmployee")Integer idEmployee);

	@Modifying(clearAutomatically = true)
	@Transactional
	@Query(value = "INSERT INTO USERS(EMAIL,PASSWORD,USERNAME)VALUES(:email,:password,:firstname)",nativeQuery = true)
	public int addCredentials(@Param("email")String email, @Param("password")String password, @Param("firstname")String firstname);

	
	@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE EMAIL =?1", nativeQuery = true)
	public Employee findByEmail(String email);

	@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE EMAIL =?1", nativeQuery = true)
	public Employee findEmployee(String email);

	@Modifying
	@Transactional
	@Query(value = "UPDATE EMPLOYEES_DETAILS SET SKILLS_APPROVE_STATUS = TRUE  WHERE ID_EMPLOYEE=:idEmployee", nativeQuery = true)
	public int approveSkills(@Param("idEmployee")Integer idEmployee);

	//@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE ACTIVE = TRUE and skills_approve_status = FALSE", nativeQuery = true)
	@Query(value = "SELECT * FROM EMPLOYEES_DETAILS  WHERE ACTIVE = TRUE AND SKILLS_APPROVE_STATUS = FALSE AND DENY_APPROVAL IS NULL", nativeQuery = true)
	public List<Employee> findEmployeesToApproveDocAndSkills();

	@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE SKILLS_APPROVE = TRUE AND ID_EMPLOYEE=:idEmployee AND ACTIVE = TRUE", nativeQuery = true)
	public Employee getSkillsToDispaly(@Param("idEmployee")Integer idEmployee);

	@Modifying
	@Transactional
	@Query(value = "Delete from temp_skills where ID_EMPLOYEE=:idEmployee", nativeQuery = true)
	public void deleteSkills(@Param("idEmployee")Integer idEmployee);

	@Modifying(clearAutomatically = true)
	@Transactional
	@Query(value = "INSERT INTO employees_details(id_employee, skills, skills_approve_status)VALUES(:idEmployee,:skills,TRUE)",nativeQuery = true)
	public int insertSkills (@Param("idEmployee")Integer idEmployee, @Param("skills")Set<String> skills);

	@Modifying(clearAutomatically = true)
	@Transactional
	//@Query(value = "UPDATE EMPLOYEES_DETAILS e SET e.SKILLS_APPROVE_STATUS=:approval WHERE e.ID_EMPLOYEE=:idEmployee", nativeQuery = true)
	//public void updatePermanentSkills(@Param("approval")List<Boolean> approval, @Param("idEmployee")Integer idEmployee);
	@Query(value = "UPDATE EMPLOYEES_DETAILS e SET e.SKILLS_APPROVE_STATUS = true WHERE e.ID_EMPLOYEE=:idEmployee", nativeQuery = true)
	public void updatePermanentSkills(@Param("idEmployee")Integer idEmployee);

	@Modifying(clearAutomatically = true)
	@Transactional
@Query(value = "UPDATE EMPLOYEES_DETAILS  SET  DENY_APPROVAL= true WHERE ID_EMPLOYEE=:idEmployee", nativeQuery = true)
	public int updateDenyStatus(Integer idEmployee);

	/*@Modifying(clearAutomatically = true)
	@Transactional
	public Employee insertPermanentSkills(@Param("idEmployee")Integer idEmployee, @Param("permanentSkills")Set<String> permanentSkills);
	@Query(value = "INSERT INTO PERMANENT_SKILLS(ID_EMPLOYEE,PERMANENT_SKILLS)VALUES(:idEmployee,:permanentSkills)",nativeQuery = true)


*/

	/*
	@Transactional
	@Modifying
	@Query(value = "INSERT INTO TEMP_SKILLS (ID_EMPLOYEE,SKILLS)  VALUES (:idEmployee,:skills)", nativeQuery = true)
	//@Query(value = "UPDATE TEMP_SKILLS SET SKILLS = :skills  WHERE ID_EMPLOYEE=:idEmployee", nativeQuery = true)
	public int insertSkills(@Param("idEmployee")Integer idEmployee ,@Param("skills")Set<String> skills);
*/




}

	
	