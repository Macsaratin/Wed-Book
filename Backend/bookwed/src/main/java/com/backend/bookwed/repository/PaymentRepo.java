package com.backend.bookwed.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.bookwed.entity.Payment;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Long> {
}