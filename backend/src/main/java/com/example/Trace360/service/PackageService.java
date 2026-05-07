package com.example.Trace360.service;

import com.example.Trace360.dto.AssignAgentRequest;
import com.example.Trace360.dto.CreatePackageRequest;
import com.example.Trace360.dto.PackageResponse;
import com.example.Trace360.dto.UpdateStatusRequest;
import com.example.Trace360.entity.DeliveryAgent;
import com.example.Trace360.entity.Package;
import com.example.Trace360.entity.PackageStatus;
import com.example.Trace360.repository.DeliveryAgentRepository;
import com.example.Trace360.repository.PackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PackageService {

    private final PackageRepository packageRepository;
    private final DeliveryAgentRepository agentRepository;

    // ── CREATE ───────────────────────────────────────────────────────────────

    @Transactional
    public PackageResponse createPackage(CreatePackageRequest request) {
        if (packageRepository.existsByTrackingNumber(request.getTrackingNumber())) {
            throw new RuntimeException("Tracking number already exists: " + request.getTrackingNumber());
        }

        Package pkg = new Package();
        pkg.setTrackingNumber(request.getTrackingNumber());
        pkg.setSenderName(request.getSenderName());
        pkg.setRecipientName(request.getRecipientName());
        pkg.setRecipientAddress(request.getRecipientAddress());
        pkg.setDestinationLat(request.getDestinationLat());
        pkg.setDestinationLng(request.getDestinationLng());
        pkg.setStatus(PackageStatus.PENDING);   // always starts as PENDING

        return toResponse(packageRepository.save(pkg));
    }

    // ── READ ─────────────────────────────────────────────────────────────────

    public PackageResponse getByTrackingNumber(String trackingNumber) {
        Package pkg = packageRepository.findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new RuntimeException("Package not found: " + trackingNumber));
        return toResponse(pkg);
    }

    public PackageResponse getById(Long id) {
        Package pkg = packageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found with id: " + id));
        return toResponse(pkg);
    }

    public List<PackageResponse> getAllPackages() {
        return packageRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<PackageResponse> getByStatus(PackageStatus status) {
        return packageRepository.findByStatus(status).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<PackageResponse> getByAgent(Long agentId) {
        return packageRepository.findByAssignedAgentId(agentId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ── ASSIGN AGENT ─────────────────────────────────────────────────────────

    @Transactional
    public PackageResponse assignAgent(Long packageId, AssignAgentRequest request) {
        Package pkg = packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found with id: " + packageId));

        // Only PENDING packages can be assigned
        if (pkg.getStatus() != PackageStatus.PENDING) {
            throw new RuntimeException(
                "Cannot assign agent. Package is already " + pkg.getStatus() +
                ". Only PENDING packages can be assigned."
            );
        }

        DeliveryAgent agent = agentRepository.findById(request.getAgentId())
                .orElseThrow(() -> new RuntimeException("Agent not found with id: " + request.getAgentId()));

        if (!agent.getIsAvailable()) {
            throw new RuntimeException("Agent " + agent.getName() + " is not available.");
        }

        pkg.setAssignedAgent(agent);
        pkg.setStatus(PackageStatus.ASSIGNED);  // PENDING → ASSIGNED

        // Mark agent as unavailable
        agent.setIsAvailable(false);
        agentRepository.save(agent);

        return toResponse(packageRepository.save(pkg));
    }

    // ── UPDATE STATUS (lifecycle enforcement) ────────────────────────────────

    @Transactional
    public PackageResponse updateStatus(Long packageId, UpdateStatusRequest request) {
        Package pkg = packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found with id: " + packageId));

        validateStatusTransition(pkg.getStatus(), request.getStatus());
        pkg.setStatus(request.getStatus());

        // When delivered, free up the agent
        if (request.getStatus() == PackageStatus.DELIVERED && pkg.getAssignedAgent() != null) {
            DeliveryAgent agent = pkg.getAssignedAgent();
            agent.setIsAvailable(true);
            agentRepository.save(agent);
        }

        return toResponse(packageRepository.save(pkg));
    }

    // ── STATUS LIFECYCLE VALIDATION ──────────────────────────────────────────
    // Valid transitions:
    // PENDING    → ASSIGNED
    // ASSIGNED   → IN_TRANSIT
    // IN_TRANSIT → DELIVERED

    private void validateStatusTransition(PackageStatus current, PackageStatus next) {
        boolean valid = switch (current) {
            case PENDING    -> next == PackageStatus.ASSIGNED;
            case ASSIGNED   -> next == PackageStatus.IN_TRANSIT;
            case IN_TRANSIT -> next == PackageStatus.DELIVERED;
            case DELIVERED  -> false; // terminal state
        };

        if (!valid) {
            throw new RuntimeException(
                "Invalid status transition: " + current + " → " + next +
                ". Allowed: PENDING→ASSIGNED, ASSIGNED→IN_TRANSIT, IN_TRANSIT→DELIVERED"
            );
        }
    }

    // ── MAPPER ───────────────────────────────────────────────────────────────

    public PackageResponse toResponse(Package pkg) {
        return new PackageResponse(
            pkg.getId(),
            pkg.getTrackingNumber(),
            pkg.getSenderName(),
            pkg.getRecipientName(),
            pkg.getRecipientAddress(),
            pkg.getDestinationLat(),
            pkg.getDestinationLng(),
            pkg.getStatus(),
            pkg.getEstimatedDeliveryTime(),
            pkg.getAssignedAgent() != null ? pkg.getAssignedAgent().getId() : null,
            pkg.getAssignedAgent() != null ? pkg.getAssignedAgent().getName() : null,
            pkg.getCurrentLat(),
            pkg.getCurrentLng(),
            pkg.getLastLocationUpdate()
        );
    }
}