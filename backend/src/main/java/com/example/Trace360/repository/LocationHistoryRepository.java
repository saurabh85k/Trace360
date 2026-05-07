package com.example.Trace360.repository;

import com.example.Trace360.entity.LocationHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LocationHistoryRepository extends JpaRepository<LocationHistory, Long> {
    // All location history for a package, newest first
    List<LocationHistory> findByPackageIdOrderByTimestampDesc(Long packageId);
 
    // Latest single location for a package
    Optional<LocationHistory> findTopByPackageIdOrderByTimestampDesc(Long packageId);
 
    // All history for a specific agent in DESC
    List<LocationHistory> findByAgentIdOrderByTimestampDesc(Long agentId);

    // All history for a specific agent in ASC
    List<LocationHistory> findTopByPackageIdOrderByTimestampAsc(Long packageId);
}