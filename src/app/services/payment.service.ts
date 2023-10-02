import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment/payment.module';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  // Tableau de paiements fictifs (remplacez cela par une requête réelle à une API)
  private payments: Payment[] = [
    { id: 1, amount: 120, status: 'Payé' },
    { id: 2, amount: 100, status: 'Payé' },
    { id: 3, amount: 300, status: 'Non Payé' },
    { id: 4, amount: 200, status: 'Payé' },
    { id: 5, amount: 100, status: 'Non Payé' },
  ];

  private nextPaymentId = 1;

  // Méthode pour ajouter un paiement
  addPayment(payment: Payment): void {
    payment.id = this.nextPaymentId++;
    this.payments.push(payment);
  }

  // Méthode pour obtenir tous les paiements
  getPayments(): Payment[] {
    return this.payments;
  }

  // Méthode pour obtenir le prochain ID de paiement disponible
  getNextPaymentId(): number {
    return this.nextPaymentId;
  }

  // Méthode pour obtenir les paiements impayés
  getUnpaidPayments(): Payment[] {
    return this.payments.filter(payment => payment.status === 'Non Payé');
  }
}
