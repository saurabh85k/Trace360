package com.example.Trace360.dto;
 
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
 
@Data
public class CreatePackageRequest {
 
    @NotBlank(message = "Tracking number is required")
    private String trackingNumber;
 
    @NotBlank(message = "Sender name is required")
    private String senderName;
 
    @NotBlank(message = "Recipient name is required")
    private String recipientName;
 
    @NotBlank(message = "Recipient address is required")
    private String recipientAddress;
 
    @NotNull(message = "Destination latitude is required")
    private Double destinationLat;
 
    @NotNull(message = "Destination longitude is required")
    private Double destinationLng;
}
