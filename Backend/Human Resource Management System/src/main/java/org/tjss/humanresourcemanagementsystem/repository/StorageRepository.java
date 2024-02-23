package org.tjss.humanresourcemanagementsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tjss.humanresourcemanagementsystem.entity.ImageData;

public interface StorageRepository extends JpaRepository<ImageData,Integer>{
	Optional<ImageData> findByName(String fileName);
}
