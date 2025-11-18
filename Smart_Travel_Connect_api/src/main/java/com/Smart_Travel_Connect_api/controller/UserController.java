package com.Smart_Travel_Connect_api.controller;

import com.Smart_Travel_Connect_api.model.User;
import com.Smart_Travel_Connect_api.repo.UserRepo;
import com.Smart_Travel_Connect_api.model.Ticket;
import com.Smart_Travel_Connect_api.repo.TicketRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Base64;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final UserRepo userRepository;
    private final TicketRepo ticketRepository;


    // SIGN-UP (CREATE USER)
    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody User user) {

        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email is required"));
        }
        if (user.getPasswordHash() == null || user.getPasswordHash().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Password is required"));
        }

        User existing = userRepository.findByEmail(user.getEmail());
        if (existing != null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered"));
        }

        // 🔐 BASE64 ENCODE PASSWORD
        String encodedPassword = Base64.getEncoder().encodeToString(user.getPasswordHash().getBytes());
        user.setPasswordHash(encodedPassword);

        // Default role
        user.setRole("user");

        User saved = userRepository.save(user);

        return ResponseEntity.ok(Map.of(
                "message", "User registered successfully",
                "user", saved
        ));
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

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestParam String email, @RequestParam String password) {

        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
        }

        // 🔐 Decode stored Base64 password
        String decodedPassword = new String(Base64.getDecoder().decode(user.getPasswordHash()));

        if (!password.equals(decodedPassword)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid password"));
        }

        return ResponseEntity.ok(Map.of("message", "Login successful", "user", user));
    }


    @PostMapping("/google-login")
    public ResponseEntity<Map<String, Object>> googleLogin(@RequestBody User googleUser) {

        String email = googleUser.getEmail();
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Email is required for Google Login"));
        }

        User existingUser = userRepository.findByEmail(email);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful.");

        // If user already exists, return them
        if (existingUser != null) {
            response.put("user", existingUser);
            return ResponseEntity.ok(response);
        }

        // If user does not exist → auto register them
        User newUser = User.builder()
                .name(googleUser.getName())
                .email(googleUser.getEmail())
                .passwordHash(null)   // Google login → no password required
                .role("user")         // default role
                .build();

        User savedUser = userRepository.save(newUser);
        response.put("user", savedUser);

        return ResponseEntity.ok(response);
    }

}

