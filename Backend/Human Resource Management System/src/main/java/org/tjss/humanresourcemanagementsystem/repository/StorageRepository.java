package org.tjss.humanresourcemanagementsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.tjss.humanresourcemanagementsystem.entity.ImageData;

public interface StorageRepository extends JpaRepository<ImageData,Integer>{
	Optional<ImageData> findByName(String fileName);
	
	@Query(value = "SELECT * FROM IMAGE_DATA WHERE ID IN ?1 AND APPROVE_IMAGE = FALSE", nativeQuery = true)
	public List<ImageData> findById(Integer[] idImages);

	@Modifying
	@Transactional
	@Query(value = "UPDATE IMAGE_DATA SET APPROVE_IMAGE = TRUE  WHERE ID=:imageId", nativeQuery = true)
	public int approveDocument(@Param("imageId")Integer imageId);

	@Query(value = "SELECT * FROM IMAGE_DATA WHERE ID =:imageId AND APPROVE_IMAGE = TRUE", nativeQuery = true)
	public ImageData findByIdForApproval(@Param("imageId")Integer imageId);

	@Query(value = "SELECT * FROM IMAGE_DATA WHERE ID=:imageId  AND APPROVE_IMAGE = FALSE", nativeQuery = true)
	ImageData findByIdForWaitingMessage(@Param("imageId")Integer imageId);
}


