package com.example.Trace360.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "packages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Package {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String trackingNumber;

    private String senderName;
    private String recipientName;
    private String recipientAddress;

    private Double destinationLat;
    private Double destinationLng;

    @Enumerated(EnumType.STRING)
    private PackageStatus status;   // will create enum below

    private LocalDateTime estimatedDeliveryTime;

    @ManyToOne
    @JoinColumn(name = "agent_id")
    private DeliveryAgent assignedAgent;

    private Double currentLat;
    private Double currentLng;

    private LocalDateTime lastLocationUpdate;
}