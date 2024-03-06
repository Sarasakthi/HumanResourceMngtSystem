package org.tjss.humanresourcemanagementsystem.entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users", 
    uniqueConstraints = { 
      @UniqueConstraint(columnNames = "username"),
      @UniqueConstraint(columnNames = "email") 
    })
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @NotBlank
  @Size(max = 30)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @JsonProperty(access = Access.WRITE_ONLY)
  @NotBlank
  @Size(max = 120)
  private String password;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(  name = "user_roles", 
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new HashSet<>();
  
  @ElementCollection
	@CollectionTable(name = "permanent_skills",
	joinColumns = @JoinColumn(name = "id"))
	private Set<String> permanentSkills;

  public User() {
  }

  public User(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
  
  

  public User(Integer id, @NotBlank @Size(max = 30) String username, @NotBlank @Size(max = 50) @Email String email,
		@NotBlank @Size(max = 120) String password, Set<Role> roles, Set<String> permanentSkills) {
	super();
	this.id = id;
	this.username = username;
	this.email = email;
	this.password = password;
	this.roles = roles;
	this.permanentSkills = permanentSkills;
}

public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }

public Set<String> getPermanentSkills() {
	return permanentSkills;
}

public void setPermanentSkills(Set<String> permanentSkills) {
	this.permanentSkills = permanentSkills;
}

@Override
public String toString() {
	return "User [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password + ", roles="
			+ roles + ", permanentSkills=" + permanentSkills + "]";
}
  
  
}
