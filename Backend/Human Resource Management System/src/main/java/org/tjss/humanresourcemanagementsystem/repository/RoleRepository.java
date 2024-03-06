package org.tjss.humanresourcemanagementsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.tjss.humanresourcemanagementsystem.entity.ERole;
import org.tjss.humanresourcemanagementsystem.entity.Role;



@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
  Optional<Role> findByName(ERole name);
}
