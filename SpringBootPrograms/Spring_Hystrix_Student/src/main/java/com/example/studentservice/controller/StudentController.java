package com.example.studentservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;

@RestController
public class StudentController {
	
	@Autowired
	private RestTemplate restTemplate;
	
	@HystrixCommand(fallbackMethod = "getSchoolFallback")
	@GetMapping("/student/{id}")
	public String getStudentSchool(@PathVariable String id) {
		
		String schoolName = restTemplate.getForObject("http://localhost:8082/school/{id}", String.class ,id);
		return "Student" + id + " is from " + schoolName;
	}
	
	// Fallback method
	public String getSchoolFallback(String id) {
		return "Sorry, unable to retruve the school infromation for student" + id;
	}

}
