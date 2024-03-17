package com.gccc.todo.seed;

import com.gccc.todo.repository.TodoRepository;
import com.gccc.todo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class DataSeed implements CommandLineRunner {
    private final UserRepository userRepository;
    private final TodoRepository todoRepository;
    private final PasswordEncoder passwordEncoder;
    private final Environment environment;

    public DataSeed(UserRepository userRepository, TodoRepository todoRepository, PasswordEncoder passwordEncoder, Environment environment) {
        this.userRepository = userRepository;
        this.todoRepository = todoRepository;
        this.passwordEncoder = passwordEncoder;
        this.environment = environment;
    }


    @Override
    public void run(String... args) throws Exception {
        if (!Objects.equals(environment.getProperty("todo.app.seed"), "true"))
            return;


    }
}
