package com.example.customer_profile_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.customer_profile_backend.entity.Lead;
import com.example.customer_profile_backend.repository.LeadRepository;

@Service
public class LeadService {

    private final LeadRepository repo;

    public LeadService(LeadRepository repo) {
        this.repo = repo;
    }

    public List<Lead> getAll() {
        return repo.findAll();
    }

    public Optional<Lead> getById(Long id) {
        return repo.findById(id);
    }

    public Lead save(Lead lead) {
        return repo.save(lead);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
