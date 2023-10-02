// Importations
import { Component, ViewChild } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from "ng-apexcharts";
import { ExamDateService } from "../services/exam-date.service";
import { ExamDate } from "../models/exam-date/exam-date.module";
import { CandidateService } from "../services/candidate.service";
import { Candidate } from "../models/candidate/candidate.module";
import { PaymentService } from "../services/payment.service";
import { Observable, of } from "rxjs";
import { Table } from "primeng/table";

// Types pour les options des graphiques
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  labels: string[];
};
export type ChartOptions1 = {
  series: ApexNonAxisChartSeries | undefined;
  chart: ApexChart | undefined;
  responsive: ApexResponsive[] | undefined;
  labels: any;
};

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  // Propriétés
  isSidebarVisible = true;
  @ViewChild('dt') dt: Table | undefined;
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  examDates: ExamDate[] = [];
  candidateCounts: number = 0;
  totalAvailableSlots: number = 0;
  successRate: number = 0;
  faildRate : number = 0;
  pourcentageSuccessRate: number = 0;
  paymentCounts: number = 0;
  unpaidPaymentCounts: number = 0;
  @ViewChild("chart") chart!: ChartComponent;
  @ViewChild("chart1") chart1!: ChartComponent;
  @ViewChild("chart2") chart2!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions1: Partial<ChartOptions1>;
  public chartOptions2: Partial<ChartOptions1>;

  // Méthode pour basculer la barre latérale
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    const filterValue = ($event.target as HTMLInputElement).value;
    if (this.dt) {
      this.dt.filterGlobal(filterValue, stringVal);
    }
  }

  clear(table: Table) {
    table.clear();
  }
  
  // Constructeur
  constructor(
    private examDateService: ExamDateService,
    private candidateService: CandidateService,
    private paymentService: PaymentService
  ) {
    // Initialisations et récupération des données
    this.examDates = this.examDateService.getExamDates();
    this.candidateCounts = this.candidateService.getCandidates().length;
    this.paymentCounts = this.paymentService.getPayments().length;
    this.unpaidPaymentCounts = this.paymentService.getUnpaidPayments().length;
    // Création des options pour le premier graphique
    this.chartOptions = {
      series: [
        {
          name: "Nombre de places",
          data: this.examDates.map((examDate) => examDate.availableSlots),
          color: "#4154f1",
        },
      ],
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: this.examDates.map((examDate) => examDate.date),
      },
      tooltip: {
        x: {
          format: "yyyy-MM-dd",
        },
      },
    };

    // Création des options pour le deuxième graphique (graphique en donut)
    this.chartOptions1 = {
      series: [this.paymentCounts ,this.unpaidPaymentCounts],
      chart: {
        type: "donut"
      },
      labels: ["Payé", "Non Payé"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    // Création des options pour le troisième graphique (graphique en donut)
    this.chartOptions2 = {
      series: [this.successRate ,this.faildRate],
      chart: {
        type: "donut"
      },
      labels: ["Success", "Failure"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

  }

  // Méthode appelée à l'initialisation
  ngOnInit() {
    this.calculateTotalAvailableSlots();
    this.getCandidateSuccessRate().subscribe((rate) => {
      this.successRate = rate;
    });
    this.getCandidateSuccessPourcentage().subscribe((rate) => {
      this.pourcentageSuccessRate = rate;
    });
  }

  // Calcul du total des places disponibles
  calculateTotalAvailableSlots() {
    this.totalAvailableSlots = this.examDates.reduce(
      (total, date) => total + date.availableSlots,
      0
    );
  }

  // Obtention du taux de réussite des candidats
  getCandidateSuccessRate(): Observable<number> {
    const candidates = this.candidateService.getCandidates();
    const successfulCandidates = candidates.filter(
      (candidate) => candidate.passed
    );
    const successRate = successfulCandidates.length;
    return of(successRate);
  }

  // Obtention du pourcentage de réussite des candidats
  getCandidateSuccessPourcentage(): Observable<number> {
    const candidates = this.candidateService.getCandidates();
    const successfulCandidates = candidates.filter(
      (candidate) => candidate.passed
    );
    const pourcentageSuccessRate =
      (successfulCandidates.length / candidates.length) * 100;
    return of(pourcentageSuccessRate);
  }

  // Formatage du nombre avec un préfixe zéro si nécessaire
  formatNumberWithZeroPrefix(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
