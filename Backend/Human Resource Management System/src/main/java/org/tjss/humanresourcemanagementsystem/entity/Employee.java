package org.tjss.humanresourcemanagementsystem.entity;

//import java.sql.Date;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Employees_Details")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_EMPLOYEE")
    public Integer idEmployee;

    @Column(name = "FIRST_NAME")
    public String firstname;
    
    @Column(name = "LAST_NAME")
    public String lastname;
    
    @Column(name = "EMAIL")
    public String email;
    
    //@JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "DATE_OF_JOINING")
    public Date dateofjoining;
    
    @Column(name = "DATE_OF_BIRTH")
    public Date dateofbirth;
    
    @Column(name = "DEPARTMENT")
    public String department;
    
    @Column(name = "POSITION")
    public String position;
    
    @Column(name = "REPORTING_TO")
    public String reportingto;
    
    @Column(name = "ACTIVE")
    public boolean active; 
}
