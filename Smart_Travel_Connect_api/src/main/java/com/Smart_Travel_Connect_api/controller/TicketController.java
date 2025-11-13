package com.Smart_Travel_Connect_api.controller;

import com.Smart_Travel_Connect_api.model.Ticket;
import com.Smart_Travel_Connect_api.repo.TicketRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketRepo ticketRepository;

    // Create Ticket
    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    // Get All Tickets
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    // Get Ticket by ID
    @GetMapping("/{id}")
    public Optional<Ticket> getTicketById(@PathVariable Long id) {
        return ticketRepository.findById(id);
    }

    // Delete Ticket
    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {
        ticketRepository.deleteById(id);
    }
}

