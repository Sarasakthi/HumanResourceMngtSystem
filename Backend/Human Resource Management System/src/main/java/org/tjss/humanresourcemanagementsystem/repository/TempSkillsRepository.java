package org.tjss.humanresourcemanagementsystem.repository;

/*import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import org.tjss.humanresourcemanagementsystem.entity.TempSkills;

@Repository
public interface TempSkillsRepository extends JpaRepository<TempSkills, Integer> {
	@Modifying(clearAutomatically = true)
	@Transactional
	@Query(value = "INSERT INTO TEMP_SKILLS(SKILLS,EMAIL)VALUES(:skills,:email)",nativeQuery = true)
	public int save(@Param("skills")String[] skills, @Param("email")String email);

	
	
	

}
*/