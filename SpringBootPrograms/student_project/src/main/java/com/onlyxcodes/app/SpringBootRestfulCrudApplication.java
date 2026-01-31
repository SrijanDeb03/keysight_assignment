package com.onlyxcodes.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class SpringBootRestfulCrudApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootRestfulCrudApplication.class, args);
	}

}
