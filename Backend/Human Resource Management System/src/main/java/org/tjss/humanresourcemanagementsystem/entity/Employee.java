package org.tjss.humanresourcemanagementsystem.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Employees_Details")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_EMPLOYEE")
    private Integer idEmployee;

    @Column(name = "FIRST_NAME")
    private String firstname;
}
