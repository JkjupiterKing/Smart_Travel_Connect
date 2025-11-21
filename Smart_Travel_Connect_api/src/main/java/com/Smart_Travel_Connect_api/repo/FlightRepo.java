package com.Smart_Travel_Connect_api.repo;

import com.Smart_Travel_Connect_api.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightRepo extends JpaRepository<Flight, Long> {
}

