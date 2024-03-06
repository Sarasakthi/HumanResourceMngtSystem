package org.tjss.humanresourcemanagementsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

@SpringBootApplication
public class HumanResourceManagementSystemApplication {

    public static void main(String[] args) {
        System.out.println("reached main");
        SpringApplication.run(HumanResourceManagementSystemApplication.class, args);

    }

}
