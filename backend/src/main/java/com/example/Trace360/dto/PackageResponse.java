package com.example.Trace360.dto;
 
import com.example.Trace360.entity.PackageStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
 
import java.time.LocalDateTime;
 
@Data
@AllArgsConstructor
public class PackageResponse {
    private Long id;
    private String trackingNumber;
    private String senderName;
    private String recipientName;
    private String recipientAddress;
    private Double destinationLat;
    private Double destinationLng;
    private PackageStatus status;
    private LocalDateTime estimatedDeliveryTime;
    private Long assignedAgentId;
    private String assignedAgentName;
    private Double currentLat;
    private Double currentLng;
    private LocalDateTime lastLocationUpdate;
}
