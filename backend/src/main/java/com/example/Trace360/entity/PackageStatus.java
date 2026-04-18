package com.example.Trace360.entity;

public enum PackageStatus {
    PENDING,      // not yet assigned to any agent
    ASSIGNED,     // assigned but not picked up
    IN_TRANSIT,   // picked up and moving
    DELIVERED
}