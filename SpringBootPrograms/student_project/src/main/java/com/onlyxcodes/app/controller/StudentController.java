package com.onlyxcodes.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onlyxcodes.app.model.Student;
import com.onlyxcodes.app.repository.StudentRepository;

@RestController
@RequestMapping("students")
public class StudentController {

	@Autowired
	StudentRepository studentrepository;
	
	// retrieve all student from database
	@GetMapping("all")
	public List<Student> getAllStudent()
	{
		List<Student> student=(List<Student>) studentrepository.findAll();
		return student;
	}
	
	// insert new student into database
	@PostMapping("add")
	public Student addStudent(@RequestBody Student student)
	{
		return studentrepository.save(student);
	}
	
	// get particular student by their ID
	@GetMapping("student/{id}")
	public Optional<Student> getStudentId(@PathVariable int id)
	{
		return studentrepository.findById(id);
	}
	
	// update existing student 
	@PutMapping("update/{id}")
	public Student updateStudent(@RequestBody Student student)
	{
		return studentrepository.save(student);
	}
	
	// delete particular student from database
	@DeleteMapping("delete/{id}")
	public void deleteStudent(@PathVariable int id)
	{
		studentrepository.deleteById(id);
	}
}
