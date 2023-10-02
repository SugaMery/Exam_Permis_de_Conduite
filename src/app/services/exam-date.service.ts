import { Injectable } from '@angular/core';
import { ExamDate } from '../models/exam-date/exam-date.module';

@Injectable({
  providedIn: 'root',
})
export class ExamDateService {
  // Tableau des dates d'examen initial
  private examDates: ExamDate[] = [
    { id: 1, date: '2022-10-10', availableSlots: 20 , montantExamen : 100},
    { id: 2, date: '2023-11-15', availableSlots: 15 , montantExamen : 200},
    { id: 3, date: '2023-12-05', availableSlots: 10 , montantExamen : 300},
    { id: 4, date: '2024-01-20', availableSlots: 25 , montantExamen : 500},
  ];

  // Méthode pour obtenir toutes les dates d'examen
  getExamDates(): ExamDate[] {
    return this.examDates;
  }

  // Méthode pour obtenir les dates d'examen disponibles (avec des créneaux disponibles)
  getAvailableExamDates(): ExamDate[] {
    return this.examDates.filter(date => date.availableSlots > 0);
  }
}
