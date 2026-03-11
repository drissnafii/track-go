// services/location.service.ts — GPS Location Service

import type { LocationCoords } from "@/hooks/use-location";
import * as Location from "expo-location";

/**
 * Standalone service (non-hook) for use in background callbacks,
 * event handlers or any context outside React components.
 *
 * For in-component usage, prefer the `useLocation` hook instead.
 */
export const locationService = {
    /**
     * Request foreground location permission.
     * Returns true if granted, false otherwise.
     */
    requestForegroundPermission: async (): Promise<boolean> => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        return status === Location.PermissionStatus.GRANTED;
    },

    /**
     * Check existing foreground permission without prompting the user.
     */
    hasForegroundPermission: async (): Promise<boolean> => {
        const { status } = await Location.getForegroundPermissionsAsync();
        return status === Location.PermissionStatus.GRANTED;
    },

    /**
     * Capture the current GPS position at HIGH_ACCURACY.
     * Will request permission automatically if not already granted.
     *
     * @returns LocationCoords or null if permission denied / capture failed
     */
    getCurrentPosition: async (): Promise<LocationCoords | null> => {
        try {
            const granted = await locationService.hasForegroundPermission();
            if (!granted) {
                const requested = await locationService.requestForegroundPermission();
                if (!requested) return null;
            }

            const result = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            return {
                latitude: result.coords.latitude,
                longitude: result.coords.longitude,
                accuracy: result.coords.accuracy,
                altitude: result.coords.altitude,
                timestamp: result.timestamp,
            };
        } catch (err) {
            console.error("[locationService] getCurrentPosition error:", err);
            return null;
        }
    },

    /**
     * One-shot geocoding: convert coordinates to a human-readable address.
     * Returns null if the reverse geocoding fails.
     */
    reverseGeocode: async (
        latitude: number,
        longitude: number
    ): Promise<Location.LocationGeocodedAddress | null> => {
        try {
            const results = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });
            return results[0] ?? null;
        } catch (err) {
            console.error("[locationService] reverseGeocode error:", err);
            return null;
        }
    },
};
