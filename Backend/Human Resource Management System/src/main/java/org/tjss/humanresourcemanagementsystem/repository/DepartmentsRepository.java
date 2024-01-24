package org.tjss.humanresourcemanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.tjss.humanresourcemanagementsystem.entity.Department;

@Repository
public interface DepartmentsRepository extends JpaRepository<Department, Integer> {

}
