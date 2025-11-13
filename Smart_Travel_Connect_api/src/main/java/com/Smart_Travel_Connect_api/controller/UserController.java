package com.Smart_Travel_Connect_api.controller;

import com.Smart_Travel_Connect_api.model.User;
import com.Smart_Travel_Connect_api.repo.UserRepo;
import com.Smart_Travel_Connect_api.model.Ticket;
import com.Smart_Travel_Connect_api.repo.TicketRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepo userRepository;
    private final TicketRepo ticketRepository;

    // Create User
    @PostMapping("/Create")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Get All Users
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get User By ID
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id);
    }

    // Get Tickets by User
    @GetMapping("/{userId}/tickets")
    public List<Ticket> getTicketsByUser(@PathVariable Long userId) {
        return ticketRepository.findByUserUserId(userId);
    }
    // Get User by Email and Password Verification (Login)
    @PostMapping("/login")
    public User loginUser(@RequestParam String email, @RequestParam String password) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + email);
        }

        // ⚠️ Password verification (assuming passwordHash stores plain text or hashed value)
        // If using plain text (not recommended in production)
        if (!user.getPasswordHash().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        // If password matches
        return user;
    }

}

