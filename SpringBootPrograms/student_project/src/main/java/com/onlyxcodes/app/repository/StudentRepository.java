package com.onlyxcodes.app.repository;

import org.springframework.data.repository.CrudRepository;

import com.onlyxcodes.app.model.Student;

public interface StudentRepository extends CrudRepository<Student, Integer>{

}
