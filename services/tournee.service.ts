// services/tournee.service.ts — Tournée & Colis API Service

import { Endpoints } from "@/constants/api";
import { apiClient } from "@/services/api";
import type { Colis, Livreur, Tournee, TourneeStats } from "@/types";

export const tourneeService = {
    /** Fetch a single tournée by ID */
    getTourneeById: (id: string): Promise<Tournee> =>
        apiClient.get<Tournee>(`${Endpoints.TOURNEES}/${id}`),

    /** Fetch all tournées for a given livreur */
    getTourneesForLivreur: (livreurId: string): Promise<Tournee[]> =>
        apiClient.get<Tournee[]>(`${Endpoints.TOURNEES}?livreurId=${livreurId}`),

    /** Fetch all colis for a given tournée */
    getColisForTournee: (tourneeId: string): Promise<Colis[]> =>
        apiClient.get<Colis[]>(`${Endpoints.COLIS}?tourneeId=${tourneeId}`),

    /** Fetch livreur profile by ID */
    getLivreurById: (id: string): Promise<Livreur> =>
        apiClient.get<Livreur>(`${Endpoints.LIVREURS}/${id}`),

    /** Compute dashboard statistics from a list of colis */
    computeStats: (colis: Colis[]): TourneeStats => {
        const total = colis.length;
        const livres = colis.filter((c) => c.status === "LIVRE").length;
        const enCours = colis.filter((c) => c.status === "EN_COURS").length;
        const echecs = colis.filter(
            (c) => c.status === "ECHEC" || c.status === "INCIDENT",
        ).length;
        const enAttente = colis.filter((c) => c.status === "EN_ATTENTE").length;
        const progressPercent = total > 0 ? Math.round((livres / total) * 100) : 0;

        return { total, livres, enCours, echecs, enAttente, progressPercent };
    },
};
