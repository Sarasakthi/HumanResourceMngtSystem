package org.tjss.humanresourcemanagementsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.tjss.humanresourcemanagementsystem.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

	//Find managers list to display in add employee form
	@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE POSITION =?1", nativeQuery = true)
	public List<Employee> getAllManagers(String position);

	//find employee using search word
	@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE FIRST_NAME LIKE %?1%"
			+ " OR LAST_NAME LIKE %?1% OR email LIKE %?1% OR DEPARTMENT LIKE %?1% "
			+ "OR POSITION LIKE %?1% OR REPORTING_TO LIKE %?1%", nativeQuery = true)
	public  List<Employee> getEmployees(String searchword);

	
	@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE ID_EMPLOYEE IN ?1", nativeQuery = true)
	public List<Employee> getSelectedEmployees(Integer[] idEmployees);
	
	
}//@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE FIRST_NAME =?1 OR LAST_NAME = ?1 OR EMAIL = ?1  OR DEPARTMENT =?1 OR POSITION = ?1 OR REPORTING_TO=?1", nativeQuery = true)
