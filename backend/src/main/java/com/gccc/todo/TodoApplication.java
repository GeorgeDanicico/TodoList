package com.gccc.todo;

import com.gccc.todo.config.security.TokenService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.core.env.Environment;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableConfigurationProperties({TokenService.Properties.class})
public class TodoApplication {

	public static void main(String[] args) {
		Environment environment = SpringApplication.run(TodoApplication.class, args).getEnvironment();

		for (String profileName : environment.getActiveProfiles()) {
			System.out.println("Currently active profile - " + profileName);
		}
	}

}
