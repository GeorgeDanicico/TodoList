package com.gccc.todo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class TodoApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void testMain() {
		TodoApplication.main(new String[] {});
		System.out.println("Test main method");
	}

}
