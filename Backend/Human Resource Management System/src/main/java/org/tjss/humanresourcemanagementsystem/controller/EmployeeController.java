package org.tjss.humanresourcemanagementsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.tjss.humanresourcemanagementsystem.dto.addEmployeeRequest;
import org.tjss.humanresourcemanagementsystem.service.EmployeeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/addemployee")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @PostMapping("/add")
    public ResponseEntity<String> addingEmployee (@RequestBody addEmployeeRequest addemployeerequest){
        return ResponseEntity.ok(employeeService.addingEmployee(addemployeerequest));
    }
}
