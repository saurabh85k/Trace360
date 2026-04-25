package com.example.Trace360.repository;

import com.example.Trace360.entity.LocationHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LocationHistoryRepository extends JpaRepository<LocationHistory, Long> {
    List<LocationHistory> findByPackageIdOrderByTimestampAsc(Long packageId);
}
