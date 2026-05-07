package com.example.Trace360.repository;

import com.example.Trace360.entity.DeliveryAgent;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryAgentRepository extends JpaRepository<DeliveryAgent, Long> {
    Optional<DeliveryAgent> findByEmail(String email);
 
    List<DeliveryAgent> findByIsAvailableTrue();
 
    boolean existsByEmail(String email);
}