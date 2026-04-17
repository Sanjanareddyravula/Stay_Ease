package com.app.stayease.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app.stayease.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}