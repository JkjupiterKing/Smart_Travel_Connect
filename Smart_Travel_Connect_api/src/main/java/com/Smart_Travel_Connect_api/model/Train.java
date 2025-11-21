package com.Smart_Travel_Connect_api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "trains")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Train {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainId;

    private String trainName;

    private String trainNumber;

    private String source;

    private String destination;

    private Double price;

    private Integer totalSeats;

    private String trainType; // Express / Passenger / SuperFast

    private String status; // Active / Inactive
}
