package com.springcloud.feign.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

//import com.example.model.Employee;

@FeignClient(name= "employee")
public interface Employeesclient {

	/**
	 * Interface method to get the employees information from a different microservice.
	 */
	@GetMapping(value= "/api/employees/employeeAll")
	public ArrayList getAllEmployees() ;
}

