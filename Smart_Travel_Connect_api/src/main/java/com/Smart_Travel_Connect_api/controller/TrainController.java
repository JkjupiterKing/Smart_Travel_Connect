package com.Smart_Travel_Connect_api.controller;

import com.Smart_Travel_Connect_api.model.Train;
import com.Smart_Travel_Connect_api.repo.TrainRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/admin/train")
@RequiredArgsConstructor
public class TrainController {

    private final TrainRepo trainRepository;

    @PostMapping("/add")
    public ResponseEntity<Train> addTrain(@RequestBody Train train) {
        return ResponseEntity.ok(trainRepository.save(train));
    }

    @GetMapping("/all")
    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Train> updateTrain(@PathVariable Long id, @RequestBody Train trainDetails) {
        Train train = trainRepository.findById(id).orElseThrow();
        train.setTrainName(trainDetails.getTrainName());
        train.setTrainNumber(trainDetails.getTrainNumber());
        train.setSource(trainDetails.getSource());
        train.setDestination(trainDetails.getDestination());
        train.setPrice(trainDetails.getPrice());
        train.setTotalSeats(trainDetails.getTotalSeats());
        train.setTrainType(trainDetails.getTrainType());
        train.setStatus(trainDetails.getStatus());
        return ResponseEntity.ok(trainRepository.save(train));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTrain(@PathVariable Long id) {
        trainRepository.deleteById(id);
        return ResponseEntity.ok("Train deleted successfully");
    }
}

