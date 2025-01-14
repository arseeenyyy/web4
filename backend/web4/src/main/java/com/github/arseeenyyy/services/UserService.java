package com.github.arseeenyyy.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.github.arseeenyyy.models.entities.UserEntity;
import com.github.arseeenyyy.repositories.*;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserEntity registerUser(String login, String password) {
        UserEntity user = new UserEntity();
        user.setLogin(login);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        return user;
    }

    @Transactional
    public UserEntity getUser(String login) {
        return userRepository.findByLogin(login);
    }
    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword); 
    }
}