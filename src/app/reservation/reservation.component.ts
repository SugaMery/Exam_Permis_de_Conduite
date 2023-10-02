import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExamDateService } from '../services/exam-date.service';
import { ExamDate } from '../models/exam-date/exam-date.module';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  // Propriétés de la classe
  isSidebarVisible = true;
  availableExamDates: ExamDate[] = [];
  selectedExamDate: string = 'non sélectionné';
  firstName: string = '';
  lastName: string = '';
  emailAddress: string = '';
  phoneNumber: string = '';

  // Méthode pour basculer la barre latérale
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  constructor(
    private examDateService: ExamDateService,
    private messageService: MessageService // Injection du service MessageService
  ) {}

  ngOnInit(): void {
    // Initialisation des données disponibles pour les dates d'examen
    this.availableExamDates = this.examDateService.getAvailableExamDates();
  }

  // Méthode pour soumettre le formulaire de réservation
  submitReservationForm(): void {
    // Vérifiez si tous les champs sont remplis
    if (
      this.selectedExamDate &&
      this.firstName &&
      this.lastName &&
      this.emailAddress &&
      this.phoneNumber
    ) {
      // Affichez le message de réservation en cours de traitement
      this.messageService.add({
        severity: 'success',
        summary: 'En cours de traitement',
        detail: 'Votre réservation est en cours de traitement. Vous avez 48 heures pour effectuer le paiement afin de confirmer votre réservation et garantir votre place.'
      });

      // Réinitialisez les champs du formulaire après soumission
      this.selectedExamDate = 'non sélectionné';
      this.firstName = '';
      this.lastName = '';
      this.emailAddress = '';
      this.phoneNumber = '';

    } else {
      // Affichez un message d'erreur si tous les champs ne sont pas remplis
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur de formulaire',
        detail: 'Veuillez remplir tous les champs du formulaire.'
      });
    }
  }
}
