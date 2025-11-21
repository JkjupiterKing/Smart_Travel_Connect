package com.Smart_Travel_Connect_api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "flights")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flightId;

    private String airlineName;

    private String flightNumber;

    private String source;

    private String destination;

    private Double price;

    private Integer totalSeats;

    private String flightType; // Economy / Business / Premium

    private String status; // Active / Inactive
}

