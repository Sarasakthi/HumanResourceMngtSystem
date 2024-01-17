package org.tjss.humanresourcemanagementsystem.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.tjss.humanresourcemanagementsystem.dto.addEmployeeRequest;
import org.tjss.humanresourcemanagementsystem.entity.Employee;
import org.tjss.humanresourcemanagementsystem.repository.EmployeeRepository;
import org.tjss.humanresourcemanagementsystem.service.EmployeeService;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Override
    public String addingEmployee(addEmployeeRequest addemployeerequest) {
        Employee emp = new Employee();
        emp.setFirstname(addemployeerequest.getFirstName());
        employeeRepository.save(emp);
        return null;
    }
}
