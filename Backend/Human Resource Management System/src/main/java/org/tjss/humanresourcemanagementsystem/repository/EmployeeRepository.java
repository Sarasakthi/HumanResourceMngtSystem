package org.tjss.humanresourcemanagementsystem.repository;

import java.util.List;
import java.util.Optional;

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
	@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE ACTIVE = TRUE", nativeQuery = true)
	public List<Employee> findAll();


	
	@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE ID_EMPLOYEE IN ?1", nativeQuery = true)
	public List<Employee> getSelectedEmployees(Integer[] idEmployees);

	@Modifying
	@Transactional
	@Query(value = "UPDATE EMPLOYEES_DETAILS SET DEPARTMENT=:department, POSITION=:position, REPORTING_TO=:reporting_to  WHERE ID_EMPLOYEE=:idEmployee", nativeQuery = true)
	public void updateEmployee(@Param("department")String department,@Param("position")String position,@Param("reporting_to")String reporting_to, @Param("idEmployee")Integer idEmployee);

	
	@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE ID_EMPLOYEE =?1", nativeQuery = true)
	public Employee findEmployee(Integer idEmployee);

	@Modifying
	@Transactional
	@Query(value = "UPDATE EMPLOYEES_DETAILS SET ACTIVE = FALSE  WHERE ID_EMPLOYEE=:idEmployee", nativeQuery = true)
	public void deleteEmployee(@Param("idEmployee")Integer idEmployee);

	@Modifying(clearAutomatically = true)
	@Transactional
	@Query(value = "INSERT INTO USERS(EMAIL,PASSWORD,USERNAME)VALUES(:email,:password,:firstname)",nativeQuery = true)
	public int addCredentials(@Param("email")String email, @Param("password")String password, @Param("firstname")String firstname);
	
	
	

	
}

	
	