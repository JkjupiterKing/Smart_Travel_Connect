package com.Smart_Travel_Connect_api.controller;

import com.Smart_Travel_Connect_api.model.Payment;
import com.Smart_Travel_Connect_api.repo.PaymentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentRepo paymentRepository;

    // Create a new payment
    @PostMapping
    public Payment createPayment(@RequestBody Payment payment) {
        return paymentRepository.save(payment);
    }

    // Get all payments
    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Get payment by ID
    @GetMapping("/{id}")
    public Optional<Payment> getPaymentById(@PathVariable Long id) {
        return paymentRepository.findById(id);
    }

    // Get payments for a specific ticket
    @GetMapping("/ticket/{ticketId}")
    public List<Payment> getPaymentsByTicket(@PathVariable Long ticketId) {
        return paymentRepository.findByTicketTicketId(ticketId);
    }

    // Delete a payment
    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) {
        paymentRepository.deleteById(id);
    }
}

