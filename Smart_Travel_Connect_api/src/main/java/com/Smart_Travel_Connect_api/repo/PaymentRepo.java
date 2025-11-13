package com.Smart_Travel_Connect_api.repo;

import com.Smart_Travel_Connect_api.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentRepo extends JpaRepository<Payment, Long> {
    List<Payment> findByTicketTicketId(Long ticketId);
}

