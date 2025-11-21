package com.Smart_Travel_Connect_api.controller;

import com.Smart_Travel_Connect_api.model.Flight;
import com.Smart_Travel_Connect_api.repo.FlightRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/flight")
@RequiredArgsConstructor
public class FlightController {

    private final FlightRepo flightRepository;

    @PostMapping("/add")
    public ResponseEntity<Flight> addFlight(@RequestBody Flight flight) {
        return ResponseEntity.ok(flightRepository.save(flight));
    }

    @GetMapping("/all")
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Flight> updateFlight(@PathVariable Long id, @RequestBody Flight flightDetails) {
        Flight flight = flightRepository.findById(id).orElseThrow();
        flight.setAirlineName(flightDetails.getAirlineName());
        flight.setFlightNumber(flightDetails.getFlightNumber());
        flight.setSource(flightDetails.getSource());
        flight.setDestination(flightDetails.getDestination());
        flight.setPrice(flightDetails.getPrice());
        flight.setTotalSeats(flightDetails.getTotalSeats());
        flight.setFlightType(flightDetails.getFlightType());
        flight.setStatus(flightDetails.getStatus());
        return ResponseEntity.ok(flightRepository.save(flight));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFlight(@PathVariable Long id) {
        flightRepository.deleteById(id);
        return ResponseEntity.ok("Flight deleted successfully");
    }
}

