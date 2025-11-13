package com.Smart_Travel_Connect_api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private Double amount;

    private String paymentMode; // e.g., UPI, Credit Card, Debit Card, NetBanking

    private String transactionId;

    private String status; // e.g., SUCCESS, FAILED, PENDING

    // Relationship with Ticket
    @ManyToOne
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;
}
