package com.example.customer_profile_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.customer_profile_backend.entity.Lead;

public interface LeadRepository extends JpaRepository<Lead, Long> {}
