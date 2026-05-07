package com.example.Trace360.dto;
 
import lombok.AllArgsConstructor;
import lombok.Data;
 
import java.time.LocalDateTime;
 
@Data
@AllArgsConstructor
public class LocationResponse {
    private Long packageId;
    private Long agentId;
    private Double lat;
    private Double lng;
    private LocalDateTime timestamp;
    private Double etaHours;          // calculated ETA to destination
    private Double distanceKm;        // distance remaining to destination
}