package com.backend.bookwed.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.bookwed.exceptions.UserNotFoundException;
import com.backend.bookwed.payloads.LoginCredentials;
import com.backend.bookwed.payloads.UserDTO;
import com.backend.bookwed.security.JWTUtil;
import com.backend.bookwed.service.UserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "E-Commerce Application")
public class AuthController {

@Autowired
private UserService userService;

@Autowired
private JWTUtil jwtUtil;

@Autowired
private AuthenticationManager authenticationManager;

@Autowired
private PasswordEncoder passwordEncoder;

@PostMapping("/register")
public ResponseEntity<Map<String, Object>> registerHandler(@Valid @RequestBody UserDTO user)
        throws UserNotFoundException {
    String encodedPass = passwordEncoder.encode(user.getPassword());

    user.setPassword(encodedPass);

    UserDTO userDTO = userService.registerUser(user);

    String token = jwtUtil.generateToken(userDTO.getEmail());

    return new ResponseEntity<>(Collections.singletonMap("jwt-token", token),
            HttpStatus.CREATED);

}

@PostMapping("/login")
public Map<String, Object> loginHandler(@Valid @RequestBody LoginCredentials credentials) {

    UsernamePasswordAuthenticationToken authCredentials = new UsernamePasswordAuthenticationToken(
            credentials.getEmail(), credentials.getPassword());

    authenticationManager.authenticate(authCredentials);

    String token = jwtUtil.generateToken(credentials.getEmail());

    return Collections.singletonMap("jwt-token", token);

}

}