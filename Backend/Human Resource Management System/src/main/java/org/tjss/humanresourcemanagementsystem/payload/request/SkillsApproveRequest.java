package org.tjss.humanresourcemanagementsystem.payload.request;

public class SkillsApproveRequest {

	private Integer idEmployee;

	public SkillsApproveRequest(Integer idEmployee) {
		super();
		this.idEmployee = idEmployee;
	}

	public Integer getIdEmployee() {
		return idEmployee;
	}

	public void setIdEmployee(Integer idEmployee) {
		this.idEmployee = idEmployee;
	}
	
}
