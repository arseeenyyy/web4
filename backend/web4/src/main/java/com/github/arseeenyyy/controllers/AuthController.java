package com.github.arseeenyyy.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.arseeenyyy.models.entities.UserEntity;
import com.github.arseeenyyy.models.request.UserRequest;
import com.github.arseeenyyy.models.response.MessageResponse;
import com.github.arseeenyyy.services.UserService;
@RestController
@CrossOrigin
@RequestMapping
public class AuthController {
    @Autowired
    private UserService service;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<MessageResponse> loginUser(@RequestBody UserRequest request) {
        UserEntity user = service.getUser(request.getLogin());
        if (user != null && user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.ok(new MessageResponse(String.valueOf(user.getId())));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("no user with such login or password"));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<MessageResponse> registerUser(@RequestBody UserRequest request) {
        try {
            UserEntity user = service.registerUser(request.getLogin(), request.getPassword());
            return ResponseEntity.ok(new MessageResponse(String.valueOf(user.getId())));
        } catch (DataIntegrityViolationException exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("User with such login already exists"));    
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Error registrating new user, sorry :("));
        }
    }
}