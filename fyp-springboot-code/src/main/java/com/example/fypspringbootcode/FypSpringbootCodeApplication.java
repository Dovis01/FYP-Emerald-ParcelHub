package com.example.fypspringbootcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class FypSpringbootCodeApplication {

	public static void main(String[] args) {
		SpringApplication.run(FypSpringbootCodeApplication.class, args);
	}

	@GetMapping("/")
	public String hello2() {
		return "Hello World!";
	}

}
