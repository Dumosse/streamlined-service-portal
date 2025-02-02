package com.streamlineportal.backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tblUsers")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long user_id;

    @Column(name = "username")
    private String username;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "password")
    private String password;

    @Column(name = "employee_id")
    private String employee_id;

    @Column(name = "email")
    private String email;
    
    @Column(name = "department")
    private String department;

    @Column(name = "isadmin")
    private Boolean isadmin = false;

    public UserEntity() {
    }


    public UserEntity(Long user_id, String username, String firstname, String lastname, String password,
			String employee_id, String email, String department, Boolean isadmin) {
		super();
		this.user_id = user_id;
		this.username = username;
		this.firstname = firstname;
		this.lastname = lastname;
		this.password = password;
		this.employee_id = employee_id;
		this.email = email;
		this.department = department;
		this.isadmin = isadmin;
	}


	public Long getUser_id() {
        return user_id;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getPassword() {
        return password;
    }

    public String getEmployee_id() {
        return employee_id;
    }

    public String getEmail() {
        return email;
    }

    public Boolean getIsadmin() {
        return isadmin;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmployee_id(String employee_id) {
        this.employee_id = employee_id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setIsadmin(Boolean isadmin) {
        this.isadmin = isadmin;
    }


	public String getDepartment() {
		return department;
	}


	public void setDepartment(String department) {
		this.department = department;
	}

    
}


