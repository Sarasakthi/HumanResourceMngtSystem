package org.tjss.humanresourcemanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.tjss.humanresourcemanagementsystem.entity.Technology;

@Repository
public interface TechnologyRepository extends JpaRepository<Technology, Integer> {

}
