// hooks/use-location.ts

import * as Location from "expo-location";
import { useCallback, useEffect, useRef, useState } from "react";

export type LocationCoords = {
    latitude: number;
    longitude: number;
    accuracy: number | null;
    altitude: number | null;
    timestamp: number;
};

export type UseLocationReturn = {
    /** Current GPS coordinates, or null if not yet captured */
    coords: LocationCoords | null;
    /** Whether a location request is in progress */
    loading: boolean;
    /** Error message if permission denied or capture failed */
    error: string | null;
    /** Whether foreground permission has been granted */
    hasPermission: boolean;
    /** Request (or re-request) foreground permission */
    requestPermission: () => Promise<boolean>;
    /** Capture the current position with HIGH_ACCURACY */
    getCurrentPosition: () => Promise<LocationCoords | null>;
    /** Clear any previous error */
    clearError: () => void;
};

/**
 * Hook encapsulating expo-location foreground permission flow
 * and HIGH_ACCURACY position capture.
 *
 * Usage:
 *   const { coords, loading, error, hasPermission, requestPermission, getCurrentPosition } = useLocation();
 */
export function useLocation(autoRequest = false): UseLocationReturn {
    const [coords, setCoords] = useState<LocationCoords | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasPermission, setHasPermission] = useState(false);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        // Check existing permission status on mount without re-prompting
        (async () => {
            const { status } = await Location.getForegroundPermissionsAsync();
            if (mountedRef.current) {
                setHasPermission(status === Location.PermissionStatus.GRANTED);
            }
        })();
        return () => {
            mountedRef.current = false;
        };
    }, []);

    /** Request foreground-only location permission */
    const requestPermission = useCallback(async (): Promise<boolean> => {
        setError(null);
        const { status } = await Location.requestForegroundPermissionsAsync();
        const granted = status === Location.PermissionStatus.GRANTED;
        if (mountedRef.current) {
            setHasPermission(granted);
            if (!granted) {
                setError(
                    "L'accès à la localisation a été refusé. Veuillez l'activer dans les paramètres de l'application."
                );
            }
        }
        return granted;
    }, []);

    /** Capture current GPS position at HIGH_ACCURACY */
    const getCurrentPosition = useCallback(async (): Promise<LocationCoords | null> => {
        if (!mountedRef.current) return null;
        setLoading(true);
        setError(null);

        try {
            // Ensure permission is available before requesting position
            let permitted = hasPermission;
            if (!permitted) {
                permitted = await requestPermission();
            }
            if (!permitted) return null;

            const result = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            const locationCoords: LocationCoords = {
                latitude: result.coords.latitude,
                longitude: result.coords.longitude,
                accuracy: result.coords.accuracy,
                altitude: result.coords.altitude,
                timestamp: result.timestamp,
            };

            if (mountedRef.current) {
                setCoords(locationCoords);
            }

            return locationCoords;
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Impossible de récupérer la position GPS.";
            if (mountedRef.current) {
                setError(message);
            }
            return null;
        } finally {
            if (mountedRef.current) {
                setLoading(false);
            }
        }
    }, [hasPermission, requestPermission]);

    // Auto-request permission and capture on mount if requested
    useEffect(() => {
        if (autoRequest) {
            getCurrentPosition();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoRequest]);

    const clearError = useCallback(() => setError(null), []);

    return {
        coords,
        loading,
        error,
        hasPermission,
        requestPermission,
        getCurrentPosition,
        clearError,
    };
}
