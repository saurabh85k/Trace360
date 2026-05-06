package com.example.Trace360.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocationUpdateRequest {
    private Long packageId;
    private Long agentId;
    private Double lat;
    private Double lng;
}