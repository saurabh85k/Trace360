package com.example.Trace360.controller;

import com.example.Trace360.dto.LocationUpdateRequest;
import com.example.Trace360.entity.LocationHistory;
import com.example.Trace360.entity.Package;
import com.example.Trace360.entity.DeliveryAgent;
import com.example.Trace360.repository.LocationHistoryRepository;
import com.example.Trace360.repository.PackageRepository;
import com.example.Trace360.util.ETACalculatorUtil;
import com.example.Trace360.repository.DeliveryAgentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/location")
@CrossOrigin(origins = "http://localhost:5173") // Vite dev server port
public class LocationController {

    @Autowired
    private LocationHistoryRepository locationHistoryRepository;

    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private DeliveryAgentRepository deliveryAgentRepository;

    @Autowired
    private ETACalculatorUtil etaCalculator;

    @PostMapping("/update-location")
    public ResponseEntity<?> updateLocation(@RequestBody LocationUpdateRequest request) {

    
        Optional<Package> pkgOpt = packageRepository.findById(request.getPackageId());
        if (pkgOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Package not found");
        }

       
        Package pkg = pkgOpt.get();
        pkg.setCurrentLat(request.getLat());
        pkg.setCurrentLng(request.getLng());
        pkg.setLastLocationUpdate(LocalDateTime.now());
        packageRepository.save(pkg);

        double[] result = etaCalculator.calculateDistanceAndETA(
            request.getLat(), request.getLng(),
            pkg.getDestinationLat(), pkg.getDestinationLng()
        );
        pkg.setEstimatedDeliveryTime(LocalDateTime.now().plusMinutes((long)(result[1] * 60)));
        packageRepository.save(pkg); // save again with ETA

    
        if (request.getAgentId() != null) {
            Optional<DeliveryAgent> agentOpt = deliveryAgentRepository.findById(request.getAgentId());
            agentOpt.ifPresent(agent -> {
                agent.setCurrentLat(request.getLat());
                agent.setCurrentLng(request.getLng());
                agent.setLastLocationUpdate(LocalDateTime.now());
                deliveryAgentRepository.save(agent);
            });
        }

        LocationHistory history = new LocationHistory();
        history.setPackageId(request.getPackageId());
        history.setAgentId(request.getAgentId());
        history.setLat(request.getLat());
        history.setLng(request.getLng());
        history.setTimestamp(LocalDateTime.now());
        LocationHistory saved = locationHistoryRepository.save(history);

        return ResponseEntity.ok(saved);
    }


    @GetMapping("/get-location-history/{packageId}")
    public ResponseEntity<List<LocationHistory>> getLocationHistory(
            @PathVariable Long packageId) {

        List<LocationHistory> history =
            locationHistoryRepository.findTopByPackageIdOrderByTimestampAsc(packageId);

        return ResponseEntity.ok(history);
    }
}
