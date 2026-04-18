package com.example.Trace360.controller;

import com.example.Trace360.entity.Package;
import com.example.Trace360.entity.DeliveryAgent;
import com.example.Trace360.entity.PackageStatus;
import com.example.Trace360.repository.PackageRepository;
import com.example.Trace360.repository.DeliveryAgentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/packages")
public class PackageController {

    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private DeliveryAgentRepository deliveryAgentRepository;

    // 1. Create Package (POST)
    @PostMapping
    public Package createPackage(@RequestBody Package newPackage) {
        // Auto-generate tracking number if not provided
        if (newPackage.getTrackingNumber() == null || newPackage.getTrackingNumber().isEmpty()) {
            newPackage.setTrackingNumber("TRK" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        newPackage.setStatus(PackageStatus.PENDING);
        newPackage.setLastLocationUpdate(LocalDateTime.now());
        return packageRepository.save(newPackage);
    }

    // 2. Get Package Details by ID (GET)
    @GetMapping("/{id}")
    public Optional<Package> getPackageById(@PathVariable Long id) {
        return packageRepository.findById(id);
    }

    // 3. Get Package by Tracking Number (GET)
    @GetMapping("/track/{trackingNumber}")
    public Optional<Package> getPackageByTrackingNumber(@PathVariable String trackingNumber) {
        return packageRepository.findByTrackingNumber(trackingNumber);
    }

    // 4. Assign Agent to Package (PUT)
    @PutMapping("/{packageId}/assign/{agentId}")
    public Package assignAgent(@PathVariable Long packageId, @PathVariable Long agentId) {
        Optional<Package> pkgOpt = packageRepository.findById(packageId);
        Optional<DeliveryAgent> agentOpt = deliveryAgentRepository.findById(agentId);

        if (pkgOpt.isPresent() && agentOpt.isPresent()) {
            Package pkg = pkgOpt.get();
            pkg.setAssignedAgent(agentOpt.get());
            pkg.setStatus(PackageStatus.ASSIGNED);
            return packageRepository.save(pkg);
        }
        throw new RuntimeException("Package or Agent not found");
    }
}