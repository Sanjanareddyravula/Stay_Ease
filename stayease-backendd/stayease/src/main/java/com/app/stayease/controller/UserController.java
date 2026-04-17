package com.app.stayease.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.stayease.model.User;
import com.app.stayease.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    UserRepository repo;

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        repo.save(user);
        return "Registered Successfully";
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        User existing = repo.findByEmail(user.getEmail());
        if (existing != null && existing.getPassword().equals(user.getPassword())) {
            return existing;
        }
        return null;
    }
}