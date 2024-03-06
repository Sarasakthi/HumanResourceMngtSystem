package org.tjss.humanresourcemanagementsystem.entity;

import java.sql.Date;
import java.util.Arrays;
//import java.util.Date;
import java.util.HashSet;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Value;

//@Data
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

    // @JsonFormat(pattern = "yyyy-MM-dd")
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

    @ElementCollection
    @CollectionTable(name = "temp_skills",
            joinColumns = @JoinColumn(name = "id_employee"))
    private Set<String> skills;


    @Column(name = "IMAGE_ID")
    private Integer imageId;


    //@NotNull
   /* @ElementCollection
    @CollectionTable(name = "temp_skills",
            joinColumns = @JoinColumn(name = "id_employee"))
    private List<Boolean> skillsApproveStatus;*/

    private Boolean skillsApproveStatus;

    @Column(name = "DENY_APPROVAL")
    private Boolean denyApproval;
    public Employee(Integer idEmployee, Set<String> skills) {
        super();
        this.idEmployee = idEmployee;
        this.skills = skills;
    }

    public Employee() {

    }

    public Employee(Integer idEmployee, String firstname, String lastname, String email, Date dateofjoining, Date dateofbirth, String department, String position, String reportingto, boolean active, Set<String> skills, Integer imageId, Boolean skillsApproveStatus, Boolean denyApproval) {
        this.idEmployee = idEmployee;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.dateofjoining = dateofjoining;
        this.dateofbirth = dateofbirth;
        this.department = department;
        this.position = position;
        this.reportingto = reportingto;
        this.active = active;
        this.skills = skills;
        this.imageId = imageId;
        this.skillsApproveStatus = skillsApproveStatus;
        this.denyApproval = denyApproval;
    }

    public Employee(Integer idEmployee, String firstname, String lastname, String email, Date dateofjoining, Date dateofbirth, String department, String position, String reportingto, boolean active, Set<String> skills, Integer imageId, Boolean skillsApproveStatus) {
        this.idEmployee = idEmployee;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.dateofjoining = dateofjoining;
        this.dateofbirth = dateofbirth;
        this.department = department;
        this.position = position;
        this.reportingto = reportingto;
        this.active = active;
        this.skills = skills;
        this.imageId = imageId;
        this.skillsApproveStatus = skillsApproveStatus;
    }
/*  public Employee(Integer idEmployee, Set<String> skills, List<Boolean> skillsApproveStatus) {
        this.idEmployee = idEmployee;
        this.skills = skills;
        this.skillsApproveStatus = skillsApproveStatus;
    }*/

   /* public Employee(Integer idEmployee, String firstname, String lastname, String email, Date dateofjoining, Date dateofbirth, String department, String position, String reportingto, boolean active, Set<String> skills, Integer imageId, List<Boolean> skillsApproveStatus) {
        this.idEmployee = idEmployee;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.dateofjoining = dateofjoining;
        this.dateofbirth = dateofbirth;
        this.department = department;
        this.position = position;
        this.reportingto = reportingto;
        this.active = active;
        this.skills = skills;
        this.imageId = imageId;
        this.skillsApproveStatus = skillsApproveStatus;
    }*/

    public Employee(Integer idEmployee, String firstname, String lastname, String email, Date dateofjoining, Date dateofbirth, String department, String position, String reportingto, boolean active, Set<String> skills, Integer imageId) {
        this.idEmployee = idEmployee;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.dateofjoining = dateofjoining;
        this.dateofbirth = dateofbirth;
        this.department = department;
        this.position = position;
        this.reportingto = reportingto;
        this.active = active;
        this.skills = skills;
        this.imageId = imageId;
    }

    public Integer getIdEmployee() {
        return idEmployee;
    }

    public void setIdEmployee(Integer idEmployee) {
        this.idEmployee = idEmployee;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDateofjoining() {
        return dateofjoining;
    }

    public void setDateofjoining(Date dateofjoining) {
        this.dateofjoining = dateofjoining;
    }

    public Date getDateofbirth() {
        return dateofbirth;
    }

    public void setDateofbirth(Date dateofbirth) {
        this.dateofbirth = dateofbirth;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getReportingto() {
        return reportingto;
    }

    public void setReportingto(String reportingto) {
        this.reportingto = reportingto;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Set<String> getSkills() {
        return skills;
    }

    public void setSkills(Set<String> skills) {
        this.skills = skills;
    }

    public Integer getImageId() {
        return imageId;
    }

    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }

   /* public List<Boolean> getSkillsApproveStatus() {
        return skillsApproveStatus;
    }

    public void setSkillsApproveStatus(List<Boolean> skillsApproveStatus) {
        this.skillsApproveStatus = skillsApproveStatus;
    }*/

    public Boolean getSkillsApproveStatus() {
        return skillsApproveStatus;
    }

    public void setSkillsApproveStatus(Boolean skillsApproveStatus) {
        this.skillsApproveStatus = skillsApproveStatus;
    }

    public Boolean getDenyApproval() {
        return denyApproval;
    }

    public void setDenyApproval(Boolean denyApproval) {
        this.denyApproval = denyApproval;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "idEmployee=" + idEmployee +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                ", dateofjoining=" + dateofjoining +
                ", dateofbirth=" + dateofbirth +
                ", department='" + department + '\'' +
                ", position='" + position + '\'' +
                ", reportingto='" + reportingto + '\'' +
                ", active=" + active +
                ", skills=" + skills +
                ", imageId=" + imageId +
                ", skillsApproveStatus=" + skillsApproveStatus +
                ", denyApproval=" + denyApproval +
                '}';
    }
}