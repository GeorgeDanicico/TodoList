package com.gccc.todo.controller;

import com.gccc.todo.config.TokenService;
import com.gccc.todo.model.User;
import com.gccc.todo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class AuthController {
    private final UserService userService;
    private final TokenService tokenService;

    public AuthController(
            UserService userService,
            TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        User loggedInUser = userService.loginUser(loginRequest.email(), loginRequest.password());
        String jwtToken = tokenService.generateToken(loginRequest.email());

        return new ResponseEntity<>(new LoginResponse("Login successfully", jwtToken, loggedInUser), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {

        return new ResponseEntity<>(Map.of("message", "Logout succesfully", "data", "test"), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        return userService.registerUser(registerRequest.email(), registerRequest.name(), registerRequest.password());
    }

    public record LoginRequest(String email, String password) { }

    public record LoginResponse(String message, String token, User user) { }

    public record RegisterRequest(String email, String name, String password) {}
}
