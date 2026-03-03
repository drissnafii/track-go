// types/index.ts — Track&Go Type Definitions

export type ColisStatus =
  | "EN_ATTENTE"
  | "EN_COURS"
  | "LIVRE"
  | "ECHEC"
  | "INCIDENT";

export interface Coordonnees {
  latitude: number;
  longitude: number;
}

export interface Destinataire {
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  ville: string;
  codePostal: string;
  coordonnees: Coordonnees;
}

export interface CreneauLivraison {
  debut: string;
  fin: string;
}

export interface Colis {
  id: string;
  barcode: string;
  destinataire: Destinataire;
  poids: number;
  dimensions: string;
  description: string;
  status: ColisStatus;
  ordre: number;
  creneauLivraison: CreneauLivraison;
  tourneeId: string;
  livreurId: string;
}

export interface Tournee {
  id: string;
  date: string;
  livreurId: string;
  zone: string;
  totalColis: number;
  colisLivres: number;
  colisEchec: number;
  colisEnCours: number;
  startTime: string | null;
  endTime: string | null;
}

export interface Livreur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  vehicule: string;
  zone: string;
}

export interface TourneeStats {
  total: number;
  livres: number;
  enCours: number;
  echecs: number;
  enAttente: number;
  progressPercent: number;
}
