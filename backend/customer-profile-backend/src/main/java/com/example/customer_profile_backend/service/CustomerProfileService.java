package com.example.customer_profile_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.customer_profile_backend.entity.CustomerProfile;
import com.example.customer_profile_backend.repository.CustomerProfileRepository;

@Service
public class CustomerProfileService {

    private final CustomerProfileRepository repo;

    // ✅ Constructor-based injection: Spring tự inject repository vào đây
    public CustomerProfileService(CustomerProfileRepository repo) {
        this.repo = repo;
    }

    public List<CustomerProfile> getAll() {
        return repo.findAll();
    }

    public CustomerProfile create(CustomerProfile c) {
        return repo.save(c);
    }

    public Optional<CustomerProfile> getById(Long id) {
        return repo.findById(id);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<CustomerProfile> search(String keyword) {
        return repo.findByFullNameContainingOrEmailContainingOrPhoneContaining(keyword, keyword, keyword);
    }
}
