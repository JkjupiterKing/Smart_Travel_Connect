package com.Smart_Travel_Connect_api.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tickets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;

    private String transportType; // bus/train/flight
    private String source;
    private String destination;
    private LocalDate date;
    private String seatNo;
    private Double price;
    private String status; // booked/cancelled/completed

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

