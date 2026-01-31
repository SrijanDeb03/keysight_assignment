package com.example.schoolservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SchoolController {
	
	@GetMapping("/school/{id}")
	public String getSchoolName(@PathVariable String id) {
		
		if("error".equals(id)) {
			throw new RuntimeException("School service is down");
		}
		return "School of student " + id;
		
	}

}
