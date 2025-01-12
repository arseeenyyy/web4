package com.github.arseeenyyy.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.arseeenyyy.models.entities.UserEntity;
import com.github.arseeenyyy.repositories.*;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserEntity registerUser(String login, String password) {
        // if (userRepository.findByLogin(login) != null) {
        //     return null;
        // }
        UserEntity user = new UserEntity();
        user.setLogin(login);
        user.setPassword(password);
        userRepository.save(user);
        return user;
    }

    @Transactional
    public UserEntity getUser(String login) {
        return userRepository.findByLogin(login);
    }
}