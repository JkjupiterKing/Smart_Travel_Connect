package com.Smart_Travel_Connect_api.repo;

import com.Smart_Travel_Connect_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
