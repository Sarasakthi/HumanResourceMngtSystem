package org.tjss.humanresourcemanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.tjss.humanresourcemanagementsystem.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

	@Query(value = "SELECT * FROM EMPLOYEES_DETAILS WHERE POSITION =?1", nativeQuery = true)
	public List<Employee> getAllManagers(String position);
	
	
}
