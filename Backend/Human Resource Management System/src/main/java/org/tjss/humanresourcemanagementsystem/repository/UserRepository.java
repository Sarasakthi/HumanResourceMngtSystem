package org.tjss.humanresourcemanagementsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.tjss.humanresourcemanagementsystem.entity.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	@Query(value = "SELECT * FROM USERS WHERE EMAIL = ?1", nativeQuery = true)
	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	@Modifying
	@Transactional
	@Query(value = "UPDATE USERS SET PASSWORD = :newpassword  WHERE EMAIL=:email", nativeQuery = true)
	public int updatePassword(@Param("newpassword")String newpassword, @Param("email")String email);
	
	
	
}
