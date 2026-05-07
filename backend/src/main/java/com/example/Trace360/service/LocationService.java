package com.example.Trace360.service;

import com.example.Trace360.dto.LocationResponse;
import com.example.Trace360.dto.LocationUpdateRequest;
import com.example.Trace360.entity.DeliveryAgent;
import com.example.Trace360.entity.LocationHistory;
import com.example.Trace360.entity.Package;
import com.example.Trace360.entity.PackageStatus;
import com.example.Trace360.repository.DeliveryAgentRepository;
import com.example.Trace360.repository.LocationHistoryRepository;
import com.example.Trace360.repository.PackageRepository;
import com.example.Trace360.util.ETACalculatorUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationHistoryRepository locationHistoryRepository;
    private final PackageRepository packageRepository;
    private final DeliveryAgentRepository agentRepository;
    private final ETACalculatorUtil etaCalculator;

    // ── AGENT POSTS LOCATION UPDATE ──────────────────────────────────────────

    @Transactional
    public LocationResponse updateLocation(LocationUpdateRequest request) {
        Package pkg = packageRepository.findById(request.getPackageId())
                .orElseThrow(() -> new RuntimeException("Package not found: " + request.getPackageId()));

        DeliveryAgent agent = agentRepository.findById(request.getAgentId())
                .orElseThrow(() -> new RuntimeException("Agent not found: " + request.getAgentId()));

        // Guard: only IN_TRANSIT packages should be sending location updates
        if (pkg.getStatus() != PackageStatus.IN_TRANSIT && pkg.getStatus() != PackageStatus.ASSIGNED) {
            throw new RuntimeException(
                "Location updates only accepted for ASSIGNED or IN_TRANSIT packages. " +
                "Current status: " + pkg.getStatus()
            );
        }

        LocalDateTime now = LocalDateTime.now();

        // 1. Save to location history
        LocationHistory history = new LocationHistory();
        history.setPackageId(request.getPackageId());
        history.setAgentId(request.getAgentId());
        history.setLat(request.getLat());
        history.setLng(request.getLng());
        history.setTimestamp(now);
        locationHistoryRepository.save(history);

        // 2. Update package current position
        pkg.setCurrentLat(request.getLat());
        pkg.setCurrentLng(request.getLng());
        pkg.setLastLocationUpdate(now);

        // 3. Recalculate and store ETA
        double[] result = etaCalculator.calculateDistanceAndETA(
            request.getLat(), request.getLng(),
            pkg.getDestinationLat(), pkg.getDestinationLng()
        );
        double distanceKm = result[0];
        double etaHours   = result[1];

        pkg.setEstimatedDeliveryTime(now.plusMinutes((long)(etaHours * 60)));
        packageRepository.save(pkg);

        // 4. Update agent's last known position
        agent.setCurrentLat(request.getLat());
        agent.setCurrentLng(request.getLng());
        agent.setLastLocationUpdate(now);
        agentRepository.save(agent);

        return new LocationResponse(
            request.getPackageId(),
            request.getAgentId(),
            request.getLat(),
            request.getLng(),
            now,
            etaHours,
            distanceKm
        );
    }

    // ── GET LATEST LOCATION FOR A PACKAGE ────────────────────────────────────

    public LocationResponse getLatestLocation(Long packageId) {
        Package pkg = packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found: " + packageId));

        LocationHistory latest = locationHistoryRepository
                .findTopByPackageIdOrderByTimestampDesc(packageId)
                .orElseThrow(() -> new RuntimeException("No location data yet for package: " + packageId));

        double[] result = etaCalculator.calculateDistanceAndETA(
            latest.getLat(), latest.getLng(),
            pkg.getDestinationLat(), pkg.getDestinationLng()
        );

        return new LocationResponse(
            packageId,
            latest.getAgentId(),
            latest.getLat(),
            latest.getLng(),
            latest.getTimestamp(),
            result[1],
            result[0]
        );
    }

    // ── GET FULL LOCATION HISTORY FOR A PACKAGE ───────────────────────────────

    public List<LocationResponse> getLocationHistory(Long packageId) {
        Package pkg = packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found: " + packageId));

        return locationHistoryRepository
                .findByPackageIdOrderByTimestampDesc(packageId)
                .stream()
                .map(h -> {
                    double[] result = etaCalculator.calculateDistanceAndETA(
                        h.getLat(), h.getLng(),
                        pkg.getDestinationLat(), pkg.getDestinationLng()
                    );
                    return new LocationResponse(
                        h.getPackageId(), h.getAgentId(),
                        h.getLat(), h.getLng(),
                        h.getTimestamp(), result[1], result[0]
                    );
                })
                .collect(Collectors.toList());
    }
}