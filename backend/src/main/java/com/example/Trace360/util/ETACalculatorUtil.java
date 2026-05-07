package com.example.Trace360.util;

import org.springframework.stereotype.Component;

/**
 * Utility for calculating distance and ETA between two coordinates.
 * Uses the Haversine formula — accurate for short-to-medium distances.
 */
@Component
public class ETACalculatorUtil {

    // Earth's radius in kilometers
    private static final double EARTH_RADIUS_KM = 6371.0;

    // Assumed average delivery speed in km/h (can be made configurable later)
    private static final double AVG_SPEED_KMH = 40.0;

    /**
     * Calculate straight-line distance between two lat/lng points in kilometers.
     */
    public double calculateDistanceKm(double lat1, double lng1, double lat2, double lng2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLng = Math.toRadians(lng2 - lng1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_KM * c;
    }

    /**
     * Calculate ETA in hours given distance in km.
     * Applies a 1.3x road factor (straight-line * 1.3 ≈ actual road distance).
     */
    public double calculateETAHours(double distanceKm) {
        double roadDistance = distanceKm * 1.3;
        return roadDistance / AVG_SPEED_KMH;
    }

    /**
     * Combined: calculate both distance and ETA from current position to destination.
     * Returns [distanceKm, etaHours]
     */
    public double[] calculateDistanceAndETA(double currentLat, double currentLng,
                                             double destLat, double destLng) {
        double distance = calculateDistanceKm(currentLat, currentLng, destLat, destLng);
        double eta = calculateETAHours(distance);
        return new double[]{distance, eta};
    }
}