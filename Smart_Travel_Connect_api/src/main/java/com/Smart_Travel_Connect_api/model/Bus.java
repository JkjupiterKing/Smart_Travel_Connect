package com.Smart_Travel_Connect_api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "buses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long busId;

    private String busName;

    private String busNumber;

    private String source;

    private String destination;

    private Double price;

    private Integer totalSeats;

    private String busType; // AC / NON-AC / Sleeper / Seater

    private String status; // Active / Inactive
}

