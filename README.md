# Application de Gestion d'Examens de Conduite

Cette application Angular gère les réservations et les candidats pour les examens de conduite. Voici un aperçu de chaque module et service dans l'application :

## 1. `DashboardComponent`

Ce composant représente le tableau de bord de l'application. Il affiche diverses statistiques et graphiques liés aux examens de conduite.

## 2. `InscriptionComponent`

Ce composant permet aux utilisateurs de s'inscrire pour passer un examen de conduite en saisissant leurs informations telles que la date d'examen, le prénom, le nom, l'adresse e-mail et le numéro de téléphone.

## 3. `ReservationComponent`

Ce composant gère le processus de réservation pour les examens de conduite. Les utilisateurs peuvent sélectionner une date d'examen et saisir leurs coordonnées.

## Services :

### 1. `ExamDateService`

Un service pour gérer les dates disponibles pour les examens de conduite. Il fournit des méthodes pour obtenir toutes les dates d'examen et les dates disponibles.

### 2. `CandidateService`

Un service pour gérer les candidats qui s'inscrivent pour passer un examen de conduite. Il permet d'ajouter un candidat, de récupérer la liste des candidats, etc.

### 3. `PaymentService`

Un service pour gérer les paiements liés aux examens de conduite. Il permet d'ajouter un paiement, de récupérer la liste des paiements et de gérer les paiements impayés.

---
