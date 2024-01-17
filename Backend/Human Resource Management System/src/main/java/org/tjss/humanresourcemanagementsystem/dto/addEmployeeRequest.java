package org.tjss.humanresourcemanagementsystem.dto;

import lombok.Data;

@Data
public class addEmployeeRequest {
    private String firstName;
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }


}
