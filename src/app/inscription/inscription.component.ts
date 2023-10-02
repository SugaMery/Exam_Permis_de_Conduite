import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExamDateService } from '../services/exam-date.service';
import { CandidateService } from '../services/candidate.service';
import { ExamDate } from '../models/exam-date/exam-date.module';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent implements OnInit {
  // Propriétés de la classe
  isSidebarVisible = true;
  availableExamDates: ExamDate[] = [];
  selectedExamDate: string = 'non sélectionné';
  firstName: string = '';
  lastName: string = '';
  emailAddress: string = '';
  phoneNumber: string = '';
  paymentAmount: number | undefined;
  examAmount: number = 0;

  // Constructeur de la classe
  constructor(
    private examDateService: ExamDateService,
    private candidateService: CandidateService,
    private messageService: MessageService,
    private paymentService : PaymentService
  ) {}

  // Méthode d'initialisation
  ngOnInit(): void {
    this.availableExamDates = this.examDateService.getAvailableExamDates();
  }

  // Méthode pour basculer la barre latérale
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  // Méthode appelée lorsque la date d'examen est modifiée
  onSelectedExamDateChange() {
    this.updateExamAmount();
  }

  // Méthode pour mettre à jour le montant de l'examen
  updateExamAmount() {
    const selectedExam = this.availableExamDates.find(
      (exam) => exam.date === this.selectedExamDate
    );
    if (selectedExam) {
      this.examAmount = selectedExam.montantExamen;
    } else {
      this.examAmount = 0; // Si l'examen n'est pas trouvé, définissez-le sur 0 par défaut.
    }
  }

  // Méthode pour soumettre le formulaire de réservation
  submitReservationForm(): void {
    // Vérifiez si tous les champs sont remplis
    if (
      this.selectedExamDate &&
      this.firstName &&
      this.lastName &&
      this.emailAddress &&
      this.phoneNumber &&
      this.paymentAmount !== undefined
    ) {
      if(this.paymentAmount == this.examAmount){
        // Ajoutez le candidat avec paiement
        this.candidateService.addCandidate(
          this.firstName + ' ' + this.lastName,
          this.selectedExamDate,
          this.paymentAmount
        );
  
        // Affichez le message de réservation en cours de traitement
        this.messageService.add({
          severity: 'success',
          summary: 'Inscription validée',
          detail: 'Soyez prêt à passer l\'examen ! ',
        });
  
        // Réinitialisez les champs du formulaire
        this.selectedExamDate = 'non sélectionné';
        this.firstName = '';
        this.lastName = '';
        this.emailAddress = '';
        this.phoneNumber = '';
        this.paymentAmount = undefined;
        this.examAmount = 0;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur de paiement',
          detail: 'Veuillez effectuer le paiement du montant de l\'examen pour pouvoir planifier et passer l\'examen.',
        });
      }
    } else {
      // Affichez un message d'erreur si tous les champs ne sont pas remplis
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur de formulaire',
        detail: 'Veuillez remplir tous les champs du formulaire.',
      });
    }
  }
}
