package com.gccc.todo.service;

import com.gccc.todo.config.security.TokenService;
import com.gccc.todo.exception.AppException;
import com.gccc.todo.model.User;
import com.gccc.todo.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
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

    public ResponseEntity<String> registerUser(String email, String name, String password) {
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

        return new ResponseEntity<>("User successfully created", HttpStatus.CREATED);
    }

}
