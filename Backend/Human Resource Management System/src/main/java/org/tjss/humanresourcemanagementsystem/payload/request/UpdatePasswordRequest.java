package org.tjss.humanresourcemanagementsystem.payload.request;

import java.util.Date;

public class UpdatePasswordRequest {
	private String email;
	private String newPassword;
	private Date dateofbirth;

	public Date getDateofbirth() {
		return dateofbirth;
	}

	public void setDateofbirth(Date dateofbirth) {
		this.dateofbirth = dateofbirth;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	

	
	
	

}
