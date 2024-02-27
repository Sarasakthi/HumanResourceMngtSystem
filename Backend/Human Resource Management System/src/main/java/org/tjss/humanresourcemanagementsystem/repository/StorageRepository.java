package org.tjss.humanresourcemanagementsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.tjss.humanresourcemanagementsystem.entity.ImageData;

public interface StorageRepository extends JpaRepository<ImageData,Integer>{
	Optional<ImageData> findByName(String fileName);
	
	@Query(value = "SELECT * FROM IMAGE_DATA WHERE ID IN ?1", nativeQuery = true)
	public List<ImageData> findById(Integer[] idImages);
}
