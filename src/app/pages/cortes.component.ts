import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Card } from "primeng/card";
import { DaySelectorBarComponent } from '../components/utils/day-selector.component';

@Component({
  selector: 'app-cortes',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, TableModule, TagModule, Card, DaySelectorBarComponent],
  template: `
    <p-card class="mb-3">
      <div class="flex flex-column md:flex-row md:align-items-center justify-content-between gap-3">
        <div class="flex align-items-center gap-2">
          <i class="pi pi-chart-bar text-2xl text-primary"></i>
          <h1 class="m-0 text-2xl font-bold">Cortes de Producción</h1>
        </div>
      </div>
    </p-card>
    <div class="w-full md:w-auto">
      <app-day-selector-bar [selectedDate]="fechaActual" (dateChange)="onDateChange($event)"></app-day-selector-bar>
    </div>
    <div class="cortes-container">
      <div class="table-container">
        <table class="cortes-table">
          <thead>
            <tr class="header-group">
              <th rowspan="2" class="group-header">Producción Meta</th>
              <th rowspan="2" class="group-header">Día</th>
              <th rowspan="2" class="group-header">Hora inicio</th>
              <th rowspan="2" class="group-header">Hora fin</th>
              <th rowspan="2" class="group-header">Asistencia</th>
              <th rowspan="2" class="group-header">Calidad</th>
              <th rowspan="2" class="group-header">Efectividad</th>
              <th rowspan="2" class="group-header">Color</th>
              <th colspan="5" class="group-header">Calidad</th>
              <th colspan="3" class="group-header">Productividad Campo</th>
              <th colspan="3" class="group-header">Productividad Citas</th>
            </tr>
            <tr class="header-labels">
              <th>Asistencia Oficina</th>
              <th>Tiempo prospectado o en campo</th>
              <th>Captura de métricas</th>
              <th>Casas abordadas por hora</th>
              <th>Contactos a Prospectos</th>
              <th>Contactos a Venta</th>
              <th>No contacto nadie en casa</th>
              <th>No contacto casa abandonada</th>
              <th>Citas a Venta</th>
              <th>Citas a presentación</th>
              <th>Presentación a no compra</th>
            </tr>
          </thead>
          <tbody>
            @for (row of cortes; track $index) {
              <tr>
                <td><input pInputText type="text" class="cell-input" [(ngModel)]="row.meta" /></td>
                <td class="dia-cell">{{ row.dia }}</td>
                <td class="hora-cell">{{ row.horaInicio }}</td>
                <td class="hora-cell">{{ row.horaFin }}</td>
                <td><input pInputText type="text" class="cell-input" [(ngModel)]="row.asistencia" /></td>
                <td><input pInputText type="text" class="cell-input" [(ngModel)]="row.calidad" /></td>
                <td><input pInputText type="text" class="cell-input" [(ngModel)]="row.efectividad" /></td>
                <td [style.background-color]="row.color" class="color-cell"></td>
                <td><input pInputText type="text" class="cell-input" [(ngModel)]="row.asistOficina" /></td>
                <td><input pInputText type="text" class="cell-input" [(ngModel)]="row.tiempoCampo" /></td>
                <td><input pInputText type="text" class="cell-input" [(ngModel)]="row.capturaMetricas" /></td>
                <td><input pInputText type="text" class="cell-input" [(ngModel)]="row.casasPorHora" /></td>
                <td><input pInputText type="text" class="cell-input" [(ngModel)]="row.contactosProspectos" /></td>
                <td><input pInputText type="text" class="cell-input" [(ngModel)]="row.contactosVenta" /></td>
                <td><input pInputText type="text" class="cell-input" [(ngModel)]="row.nadieEnCasa" /></td>
                <td><input pInputText type="text" class="cell-input" [(ngModel)]="row.casaAbandonada" /></td>
                <td><input pInputText type="text" class="cell-input" [(ngModel)]="row.citasVenta" /></td>
                <td><input pInputText type="text" class="cell-input" [(ngModel)]="row.citasPresentacion" /></td>
                <td><input pInputText type="text" class="cell-input" [(ngModel)]="row.presentacionNoCompra" /></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .cortes-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 0.5rem;
    }

    .table-container {
      overflow-x: auto;
      padding: 1rem 0;
    }

    .cortes-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.75rem;
      min-width: 1500px;
    }

    .cortes-table th,
    .cortes-table td {
      border: 1px solid #c5c5c5;
      padding: 0.35rem 0.5rem;
      text-align: center;
      vertical-align: middle;
    }

    .header-group .group-header {
      background: var(--primary-color);
      color: var(--primary-color-text);
      font-weight: 600;
      font-size: 0.8rem;
      padding: 0.5rem;
    }

    .header-labels th {
      background: var(--surface-100);
      color: var(--text-color);
      font-weight: 600;
      font-size: 0.7rem;
      padding: 0.4rem 0.3rem;
      white-space: normal;
    }

    .cortes-table tbody tr:hover {
      background-color: var(--surface-hover);
    }

    .dia-cell {
      font-weight: 600;
      white-space: nowrap;
    }

    .hora-cell {
      font-weight: 500;
    }

    .color-cell {
      width: 40px;
      padding: 0;
    }

    .cell-input {
      width: 100%;
      min-width: 60px;
      padding: 0.25rem 0.35rem !important;
      font-size: 0.7rem !important;
      text-align: center;
      border: none !important;
      background: transparent !important;
    }
    
    .cell-input:focus {
      background: var(--surface-50) !important;
      border: 1px solid var(--primary-color) !important;
    }
  `]
})
export class CortesComponent implements OnInit {
  cortes: any[] = [];
  fechaActual: Date = new Date();

  onDateChange(nuevaFecha: Date) {
    this.fechaActual = nuevaFecha;
  }

  ngOnInit() {
    this.cortes = [
      {
        meta: '',
        dia: 'Lunes',
        horaInicio: '08:00',
        horaFin: '10:00',
        asistencia: 'AMADO CARRILLO CESEÑA',
        calidad: '',
        efectividad: '',
        color: '#10b981',
        asistOficina: '',
        tiempoCampo: '',
        capturaMetricas: '',
        casasPorHora: '',
        contactosProspectos: '',
        contactosVenta: '',
        nadieEnCasa: '',
        casaAbandonada: '',
        citasVenta: '',
        citasPresentacion: '',
        presentacionNoCompra: ''
      },
      {
        meta: '',
        dia: 'Lunes',
        horaInicio: '10:00',
        horaFin: '12:00',
        asistencia: '',
        calidad: '',
        efectividad: '',
        color: '#10b981',
        asistOficina: '',
        tiempoCampo: '',
        capturaMetricas: '',
        casasPorHora: '',
        contactosProspectos: '',
        contactosVenta: '',
        nadieEnCasa: '',
        casaAbandonada: '',
        citasVenta: '',
        citasPresentacion: '',
        presentacionNoCompra: ''
      },
      {
        meta: '',
        dia: 'Lunes',
        horaInicio: '12:00',
        horaFin: '14:00',
        asistencia: '',
        calidad: '',
        efectividad: '',
        color: '#ff5550',
        asistOficina: '',
        tiempoCampo: '',
        capturaMetricas: '',
        casasPorHora: '',
        contactosProspectos: '',
        contactosVenta: '',
        nadieEnCasa: '',
        casaAbandonada: '',
        citasVenta: '',
        citasPresentacion: '',
        presentacionNoCompra: ''
      }
    ];
  }
}
