package com.example.Trace360.dto;
 
import jakarta.validation.constraints.NotNull;
import lombok.Data;
 
@Data
public class LocationUpdateRequest {
 
    @NotNull(message = "Package ID is required")
    private Long packageId;
 
    @NotNull(message = "Agent ID is required")
    private Long agentId;
 
    @NotNull(message = "Latitude is required")
    private Double lat;
 
    @NotNull(message = "Longitude is required")
    private Double lng;
}