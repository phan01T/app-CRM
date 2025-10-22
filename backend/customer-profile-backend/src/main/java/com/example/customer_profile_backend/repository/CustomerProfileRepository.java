package com.example.customer_profile_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.customer_profile_backend.entity.CustomerProfile;

@Repository
public interface CustomerProfileRepository extends JpaRepository<CustomerProfile, Long> {
    List<CustomerProfile> findByFullNameContainingOrEmailContainingOrPhoneContaining(String name, String email, String phone);
}
    