import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {Routes , RouterModule} from '@angular/router' ;
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { MenuModule } from 'primeng/menu';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { NgApexchartsModule } from "ng-apexcharts";
import { ReservationComponent } from './reservation/reservation.component';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { InscriptionComponent } from './inscription/inscription.component';

const routes : Routes =[
   {path :'' , component : DashboardComponent},
   {path:'reservation' , component : ReservationComponent},
   {path: 'inscription' ,component : InscriptionComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ReservationComponent,
    InscriptionComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    ToolbarModule,
    FormsModule,
    NgApexchartsModule,
    MessagesModule,
    BrowserAnimationsModule
  ],
  exports :[
    RouterModule,
    NgApexchartsModule

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
