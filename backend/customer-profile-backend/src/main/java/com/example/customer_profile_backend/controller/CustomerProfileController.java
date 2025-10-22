package com.example.customer_profile_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.customer_profile_backend.entity.CustomerProfile;
import com.example.customer_profile_backend.service.CustomerProfileService;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin
public class CustomerProfileController {

    private final CustomerProfileService service;

    // ✅ Constructor-based injection (khởi tạo biến service đúng chuẩn Spring)
    public CustomerProfileController(CustomerProfileService service) {
        this.service = service;
    }

    @GetMapping
    public List<CustomerProfile> getAll() {
        return service.getAll();
    }

    @PostMapping
    public CustomerProfile create(@RequestBody CustomerProfile customer) {
        return service.create(customer);
    }

    @GetMapping("/{id}")
    public CustomerProfile getOne(@PathVariable Long id) {
        return service.getById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/search")
    public List<CustomerProfile> search(@RequestParam String keyword) {
        return service.search(keyword);
    }
}
