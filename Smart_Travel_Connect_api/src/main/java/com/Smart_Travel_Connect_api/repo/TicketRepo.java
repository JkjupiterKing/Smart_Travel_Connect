package com.Smart_Travel_Connect_api.repo;


import com.Smart_Travel_Connect_api.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TicketRepo extends JpaRepository<Ticket, Long> {
    List<Ticket> findByUserUserId(Long userId);
}

