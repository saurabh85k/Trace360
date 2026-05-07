package com.example.Trace360.controller;


import com.example.Trace360.entity.Package;
import com.example.Trace360.dto.UpdateStatusRequest;
import com.example.Trace360.entity.DeliveryAgent;
import com.example.Trace360.entity.PackageStatus;
import com.example.Trace360.repository.PackageRepository;
import com.example.Trace360.repository.DeliveryAgentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
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

    // 6. Update Status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest request) {
        Optional<Package> pkgOpt = packageRepository.findById(id);
        if (pkgOpt.isEmpty()) return ResponseEntity.notFound().build();

        Package pkg = pkgOpt.get();

        // Status lifecycle enforcement
        boolean valid = switch (pkg.getStatus()) {
            case PENDING    -> request.getStatus() == PackageStatus.ASSIGNED;
            case ASSIGNED   -> request.getStatus() == PackageStatus.IN_TRANSIT;
            case IN_TRANSIT -> request.getStatus() == PackageStatus.DELIVERED;
            case DELIVERED  -> false;
        };

        if (!valid) {
            return ResponseEntity.badRequest()
                .body("Invalid transition: " + pkg.getStatus() + " → " + request.getStatus());
        }

        pkg.setStatus(request.getStatus());

        // Free up agent when delivered
        if (request.getStatus() == PackageStatus.DELIVERED && pkg.getAssignedAgent() != null) {
            DeliveryAgent agent = pkg.getAssignedAgent();
            agent.setIsAvailable(true);
            deliveryAgentRepository.save(agent);
        }

        return ResponseEntity.ok(packageRepository.save(pkg));
    }

    // 5. Get all packages (GET)
    @GetMapping
    public List<Package> getAllPackages() {
        return packageRepository.findAll();
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
            DeliveryAgent agent = agentOpt.get();

            if (!agent.getIsAvailable()) {
                throw new RuntimeException("Agent is not available");
            }

            pkg.setAssignedAgent(agent);
            pkg.setStatus(PackageStatus.ASSIGNED);
            agent.setIsAvailable(false);
            deliveryAgentRepository.save(agent);
            return packageRepository.save(pkg);
        }
        throw new RuntimeException("Package or Agent not found");
    }
}