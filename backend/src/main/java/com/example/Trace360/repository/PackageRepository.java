package com.example.Trace360.repository;

import com.example.Trace360.entity.Package;
import com.example.Trace360.entity.PackageStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PackageRepository extends JpaRepository<Package, Long> {
    Optional<Package> findByTrackingNumber(String trackingNumber);

    List<Package> findByStatus(PackageStatus status);
 
    List<Package> findByAssignedAgentId(Long agentId);
 
    boolean existsByTrackingNumber(String trackingNumber);
}