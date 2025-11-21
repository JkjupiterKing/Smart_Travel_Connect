package com.Smart_Travel_Connect_api.controller;

import com.Smart_Travel_Connect_api.model.Bus;
import com.Smart_Travel_Connect_api.repo.BusRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/admin/bus")
@RequiredArgsConstructor
public class BusController {

    private final BusRepo busRepository;

    @PostMapping("/add")
    public ResponseEntity<Bus> addBus(@RequestBody Bus bus) {
        return ResponseEntity.ok(busRepository.save(bus));
    }

    @GetMapping("/all")
    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Bus> updateBus(@PathVariable Long id, @RequestBody Bus busDetails) {
        Bus bus = busRepository.findById(id).orElseThrow();
        bus.setBusName(busDetails.getBusName());
        bus.setBusNumber(busDetails.getBusNumber());
        bus.setSource(busDetails.getSource());
        bus.setDestination(busDetails.getDestination());
        bus.setPrice(busDetails.getPrice());
        bus.setTotalSeats(busDetails.getTotalSeats());
        bus.setBusType(busDetails.getBusType());
        bus.setStatus(busDetails.getStatus());
        return ResponseEntity.ok(busRepository.save(bus));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBus(@PathVariable Long id) {
        busRepository.deleteById(id);
        return ResponseEntity.ok("Bus deleted successfully");
    }
}

