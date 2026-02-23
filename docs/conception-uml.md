# Conception UML — Track&Go

---

## 1) Diagramme de Cas d'Utilisation (Use Case)

```mermaid
graph TB
    subgraph "Track&Go - Application Mobile"
        UC1["S'authentifier"]
        UC2["Consulter la tournée du jour"]
        UC3["Voir la liste des colis"]
        UC4["Voir le détail d'un colis"]
        UC5["Visualiser la carte des livraisons"]
        UC6["Scanner un code-barres"]
        UC7["Vérifier la correspondance du scan"]
        UC8["Valider une livraison"]
        UC9["Enregistrer la position GPS"]
        UC10["Prendre une photo de preuve"]
        UC11["Signaler un incident"]
        UC12["Renseigner le type d'incident"]
        UC13["Joindre une photo d'incident"]
        UC14["Filtrer les colis par statut"]
        UC15["Se déconnecter"]
    end

    Livreur(("🚚 Livreur"))

    Livreur --> UC1
    Livreur --> UC2
    Livreur --> UC3
    Livreur --> UC4
    Livreur --> UC5
    Livreur --> UC6
    Livreur --> UC8
    Livreur --> UC10
    Livreur --> UC11
    Livreur --> UC14
    Livreur --> UC15

    UC8 -.->|"«include»"| UC6
    UC8 -.->|"«include»"| UC9
    UC6 -.->|"«include»"| UC7
    UC11 -.->|"«include»"| UC12
    UC11 -.->|"«extend»"| UC13
    UC3 -.->|"«extend»"| UC14
    UC8 -.->|"«extend»"| UC10
```

---

## 2) Description des Cas d'Utilisation

### Acteur : Livreur

| # | Cas d'utilisation | Description | Préconditions | Postconditions |
|---|-------------------|-------------|---------------|----------------|
| UC1 | S'authentifier | Connexion avec email/mot de passe | Aucune | Session active, accès à la tournée |
| UC2 | Consulter la tournée | Voir le résumé de la journée (stats, progression) | Être authentifié | Tableau de bord affiché |
| UC3 | Voir la liste des colis | Afficher tous les colis de la tournée en FlatList | Être authentifié | Liste des colis visible |
| UC4 | Voir le détail d'un colis | Consulter toutes les informations d'un colis | UC3 complété | Fiche détaillée affichée |
| UC5 | Visualiser la carte | Voir les points de livraison sur une carte interactive | Être authentifié | Carte avec marqueurs affichée |
| UC6 | Scanner un code-barres | Utiliser la caméra pour lire le code du colis | Permission caméra accordée | Code-barres lu et vérifié |
| UC7 | Vérifier correspondance | Comparer le scan avec le barcode attendu du colis | UC6 complété | Match confirmé ou alerte erreur |
| UC8 | Valider une livraison | Confirmer la remise du colis au destinataire | UC6 + UC9 complétés | Colis marqué LIVRE, preuve enregistrée |
| UC9 | Enregistrer position GPS | Capturer les coordonnées du livreur | Permission localisation accordée | Position enregistrée dans la preuve |
| UC10 | Prendre photo de preuve | Photographier la remise du colis | Permission caméra accordée | Photo attachée à la preuve |
| UC11 | Signaler un incident | Déclarer un problème lors de la livraison | Colis sélectionné | Incident créé, colis marqué INCIDENT |
| UC12 | Renseigner type d'incident | Choisir parmi les types prédéfinis | UC11 initié | Type sélectionné |
| UC13 | Joindre photo d'incident | Ajouter une preuve visuelle à l'incident | UC11 initié | Photo attachée à l'incident |
| UC14 | Filtrer les colis | Trier/filtrer par statut (En attente, Livré, Incident) | UC3 complété | Liste filtrée affichée |
| UC15 | Se déconnecter | Terminer la session | Être authentifié | Session invalidée, retour login |

---

## 3) Diagramme de Classes (Class Diagram)

```mermaid
classDiagram
    class Livreur {
        +String id
        +String nom
        +String prenom
        +String email
        +String telephone
        +String vehicule
        +String zone
        +String avatar
        +login(email, password) Session
        +logout() void
    }

    class Tournee {
        +String id
        +String date
        +String livreurId
        +String zone
        +Int totalColis
        +Int colisLivres
        +Int colisEchec
        +Int colisEnCours
        +String startTime
        +String endTime
        +getProgression() Float
        +getColisParStatut(status) Colis[]
    }

    class Colis {
        +String id
        +String barcode
        +Destinataire destinataire
        +Float poids
        +String dimensions
        +String description
        +ColisStatus status
        +Int ordre
        +CreneauLivraison creneauLivraison
        +String tourneeId
        +String livreurId
        +updateStatus(status) void
        +isInCreneau() Boolean
    }

    class Destinataire {
        +String nom
        +String prenom
        +String telephone
        +String adresse
        +String ville
        +String codePostal
        +Coordonnees coordonnees
    }

    class Coordonnees {
        +Float latitude
        +Float longitude
    }

    class ProofOfDelivery {
        +String id
        +String colisId
        +String livreurId
        +String timestamp
        +Position position
        +String scannedBarcode
        +Boolean barcodeMatch
        +String photoUri
        +String signatureUri
        +validate() Boolean
    }

    class Incident {
        +String id
        +String colisId
        +String livreurId
        +IncidentType type
        +String description
        +String photoUri
        +Position position
        +String timestamp
        +Boolean resolved
        +create() void
    }

    class Position {
        +Float latitude
        +Float longitude
        +String timestamp
        +Float accuracy
        +isAccurate() Boolean
    }

    class ColisStatus {
        <<enumeration>>
        EN_ATTENTE
        EN_COURS
        LIVRE
        ECHEC
        INCIDENT
    }

    class IncidentType {
        <<enumeration>>
        DESTINATAIRE_ABSENT
        COLIS_ENDOMMAGE
        ADRESSE_INTROUVABLE
        REFUSE_PAR_CLIENT
        AUTRE
    }

    Livreur "1" --> "0..*" Tournee : effectue
    Tournee "1" --> "1..*" Colis : contient
    Colis "1" --> "1" Destinataire : adressé à
    Destinataire "1" --> "1" Coordonnees : localisé à
    Colis "1" --> "0..1" ProofOfDelivery : prouvé par
    Colis "1" --> "0..*" Incident : peut avoir
    ProofOfDelivery "1" --> "1" Position : certifié à
    Incident "1" --> "1" Position : localisé à
    Colis --> ColisStatus : a un
    Incident --> IncidentType : a un
```

---

## 4) Diagramme de Séquence — Flux de Validation de Livraison

```mermaid
sequenceDiagram
    actor L as Livreur
    participant App as Application Mobile
    participant Cam as Caméra (expo-camera)
    participant GPS as GPS (expo-location)
    participant API as Mock API (JSON-Server)
    participant DB as AsyncStorage

    L->>App: Sélectionne un colis
    App->>App: Affiche détail du colis
    L->>App: Appuie sur "Scanner pour livrer"

    App->>Cam: Ouvre le scanner
    Cam-->>App: Code-barres détecté (barcode)
    App->>App: Compare barcode scanné vs colis.barcode

    alt Barcode correspond
        App->>App: ✅ Match confirmé (vibration)
        App->>GPS: Demande position courante
        GPS-->>App: Position (lat, lng, accuracy)

        alt Précision < 50m
            App->>App: Crée ProofOfDelivery
            App->>API: POST /proofs {colisId, position, barcode}
            API-->>App: 201 Created
            App->>API: PATCH /colis/:id {status: "LIVRE"}
            API-->>App: 200 OK
            App->>DB: Sauvegarde statut localement
            App-->>L: ✅ Livraison confirmée
        else Précision >= 50m
            App-->>L: ⚠️ Signal GPS insuffisant, réessayer
        end

    else Barcode ne correspond pas
        App-->>L: ❌ Code incorrect, vérifier le colis
        Note over App: Affiche le code attendu
    end
```

---

## 5) Diagramme de Séquence — Authentification

```mermaid
sequenceDiagram
    actor L as Livreur
    participant App as Application Mobile
    participant API as Mock API (JSON-Server)
    participant Store as AsyncStorage

    Note over L,Store: Lancement de l'application
    App->>Store: Chercher token existant
    Store-->>App: Token trouvé / non trouvé

    alt Token existant
        App->>API: GET /livreurs/:id
        API-->>App: 200 Profil livreur
        App-->>L: Redirige vers Tournée
    else Pas de token
        App-->>L: Affiche écran Login
    end

    Note over L,Store: Connexion
    L->>App: Saisit email + mot de passe
    App->>App: Validation formulaire (Zod)
    App->>API: POST /auth/login {email, password}

    alt Identifiants valides
        API-->>App: 200 {livreur, token}
        App->>Store: Sauvegarde token + livreurId
        App->>API: GET /tournees?livreurId=:id&date=today
        API-->>App: 200 Tournée du jour
        App-->>L: Affiche le tableau de bord
    else Identifiants invalides
        API-->>App: 401 Unauthorized
        App-->>L: ❌ Erreur : email ou mot de passe incorrect
    end
```

---

## 6) Diagramme de Séquence — Signalement d'Incident

```mermaid
sequenceDiagram
    actor L as Livreur
    participant App as Application Mobile
    participant Cam as Caméra
    participant GPS as GPS
    participant API as Mock API
    participant DB as AsyncStorage

    L->>App: Sélectionne un colis
    L->>App: Appuie sur "Signaler un incident"
    App-->>L: Affiche formulaire d'incident

    L->>App: Sélectionne le type d'incident
    Note over App: DESTINATAIRE_ABSENT / COLIS_ENDOMMAGE / etc.

    L->>App: Rédige un commentaire

    opt Ajout de photo
        L->>App: Appuie sur "Prendre une photo"
        App->>Cam: Ouvre l'appareil photo
        L->>Cam: Prend la photo
        Cam-->>App: URI de la photo
        App-->>L: Aperçu de la photo
    end

    L->>App: Appuie sur "Envoyer"

    App->>GPS: Demande position
    GPS-->>App: Position courante

    App->>App: Crée objet Incident

    App->>API: POST /incidents {colisId, type, description, photoUri, position}
    API-->>App: 201 Created

    App->>API: PATCH /colis/:id {status: "INCIDENT"}
    API-->>App: 200 OK

    App->>DB: Sauvegarde incident localement
    App-->>L: ✅ Incident signalé avec succès
    App->>App: Retour à la liste des colis
```

---

## 7) Diagramme d'Activité — Workflow Complet du Livreur

```mermaid
flowchart TD
    A([Début de journée]) --> B{Authentifié ?}
    B -->|Non| C[Se connecter]
    B -->|Oui| D
    C --> D[Charger la tournée du jour]
    D --> E[Consulter le tableau de bord]
    E --> F{Choisir une action}

    F -->|Liste| G[Voir la liste des colis]
    F -->|Carte| H[Voir la carte des livraisons]
    F -->|Scanner| I[Ouvrir le scanner]

    G --> J[Sélectionner un colis]
    H --> J
    J --> K[Voir le détail du colis]

    K --> L{Action sur le colis ?}
    L -->|Livrer| M[Scanner le code-barres]
    L -->|Incident| R[Signaler un incident]
    L -->|Retour| G

    M --> N{Code-barres valide ?}
    N -->|Oui| O[Capturer position GPS]
    N -->|Non| P[Afficher erreur de scan]
    P --> M

    O --> Q{GPS précis ?}
    Q -->|Oui| S[Enregistrer preuve de livraison]
    Q -->|Non| T[Attendre meilleur signal]
    T --> O

    S --> U[Mettre à jour statut → LIVRE]
    U --> V[Synchroniser API + Local]
    V --> E

    R --> W[Choisir type d'incident]
    W --> X[Rédiger commentaire]
    X --> Y{Ajouter photo ?}
    Y -->|Oui| Z[Prendre photo]
    Z --> AA[Envoyer incident]
    Y -->|Non| AA
    AA --> AB[Mettre à jour statut → INCIDENT]
    AB --> V

    I --> AC[Scanner un code-barres libre]
    AC --> AD{Colis trouvé dans la tournée ?}
    AD -->|Oui| K
    AD -->|Non| AE[Colis non reconnu - Alerter]
    AE --> E
```

---

## 8) Diagramme d'État — Cycle de Vie d'un Colis

```mermaid
stateDiagram-v2
    [*] --> EN_ATTENTE : Colis assigné à la tournée

    EN_ATTENTE --> EN_COURS : Livreur démarre la livraison
    EN_COURS --> LIVRE : Scan validé + GPS enregistré
    EN_COURS --> ECHEC : Tentative échouée (hors incidents)
    EN_COURS --> INCIDENT : Incident signalé

    ECHEC --> EN_COURS : Nouvelle tentative
    INCIDENT --> EN_COURS : Incident résolu, nouvelle tentative

    LIVRE --> [*]

    note right of EN_ATTENTE : Statut initial
    note right of LIVRE : Preuve de livraison\nenregistrée
    note right of INCIDENT : Photo + commentaire\n+ position GPS
```
