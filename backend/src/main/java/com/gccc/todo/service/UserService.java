package com.gccc.todo.service;

import com.gccc.todo.config.security.TokenService;
import com.gccc.todo.exception.AppException;
import com.gccc.todo.model.User;
import com.gccc.todo.repository.UserRepository;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {
    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       TokenService tokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    public User loginUser(String email, String password) {
        try {

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> {
                        return new AppException("Error: User not found.");
                    });

            if (!passwordEncoder.matches(password, user.getPassword())) {
                throw new AppException("Error: Invalid password.");
            }

            return user;
        } catch (Exception e) {
            throw new AppException(e.toString());
        }
    }

    public ResponseEntity<?> registerUser(String email, String name, String password) {
        logger.info("Registering user with email: {}", email);
        if(userRepository.existsByEmail(email)) {
            return new ResponseEntity<>("Email already exists", HttpStatus.CONFLICT);
        }

        String encodedPassword = passwordEncoder.encode(password);
        User user = User.builder()
                .email(email)
                .name(name)
                .password(encodedPassword)
                .build();
        userRepository.save(user);

        logger.info("User successfully created with email: {}", email);

        return new ResponseEntity<>(Map.of("message", "User registered successfully"), HttpStatus.CREATED);
    }

}
