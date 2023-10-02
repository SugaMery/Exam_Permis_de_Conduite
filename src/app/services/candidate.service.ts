import { Injectable } from '@angular/core';
import { Candidate } from '../models/candidate/candidate.module';
import { PaymentService } from './payment.service';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  // Tableau de candidats initial
  private candidates: Candidate[] = [
    { id: 1, firstName: 'Mariam',lastName : 'Bril', examDate: '2023-09-30', passed: true },
    { id: 2, firstName: 'Mohamed',lastName : 'Bril', examDate: '2023-09-30', passed: false },
    { id: 3, firstName: 'Hiba',lastName : 'Bril', examDate: '2023-09-30', passed: true },
  ];

  constructor(private paymentService: PaymentService) {}

  // Méthode pour ajouter un candidat
  addCandidate(name: string, examDate: string, amountPaid: number): void {
    // Créez un nouvel objet Candidat
    const candidate: Candidate = {
      id: this.candidates.length + 1, 
      firstName: name,
      examDate: examDate,
      passed: amountPaid >= 0,
    };

    // Ajoutez le candidat à la liste des candidats
    this.candidates.push(candidate);

    // Ajoutez un paiement s'il y a un montant payé
    if (amountPaid > 0) {
      const payment = {
        id: this.paymentService.getNextPaymentId(),
        amount: amountPaid,
        status: 'Payé',
      };
      this.paymentService.addPayment(payment);
    } else {
      const payment = {
        id: this.paymentService.getNextPaymentId(),
        amount: amountPaid,
        status: 'Non Payé',
      };
      this.paymentService.addPayment(payment);
    }
  }

  // Méthode pour obtenir la liste des candidats
  getCandidates(): Candidate[] {
    return this.candidates;
  }
}
