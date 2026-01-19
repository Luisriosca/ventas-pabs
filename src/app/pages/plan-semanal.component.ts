import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-plan-semanal',
  standalone: true,
  imports: [CommonModule, InputTextModule, TableModule, TagModule],
  template: `
    <div class="plan-semanal-container">
      <div class="info-query-section">
        <div class="query-grid">
          <div class="query-field">
            <label for="nombreVendedor">Nombre vendedor</label>
            <input pInputText id="nombreVendedor" type="text" class="w-full" />
          </div>
          <div class="query-field">
            <label for="usuarioKnockio">Usuario Knockio</label>
            <input pInputText id="usuarioKnockio" type="text" class="w-full" />
          </div>
          <div class="query-field">
            <label for="observaciones">Observaciones color asistente social</label>
            <input pInputText id="observaciones" type="text" class="w-full" />
          </div>
          <div class="query-field">
            <label for="totalHoras">Total de horas invertidas hombro con hombro</label>
            <input pInputText id="totalHoras" type="text" class="w-full" />
          </div>
        </div>
      </div>
      <div class="table-container">
        <table class="plan-table">
          <thead>
            <tr class="header-group">
              <th colspan="4" class="group-header">Week to Date</th>
              <th colspan="2" class="group-header">Horarios</th>
              <th colspan="2" class="group-header">Zona</th>
              <th colspan="2" class="group-header">Acompañamiento</th>
              <th colspan="4" class="group-header">Transportación Auto y Chofer</th>
            </tr>
            <tr class="header-labels">
              <th>Producción semana pasada por</th>
              <th>Meta Producción por día</th>
              <th>Meta prospectos nuevos CRM por día</th>
              <th>Total prospectos nuevos por día semana pasada</th>
              <th>Día</th>
              <th>Hora inicio</th>
              <th>Zona A</th>
              <th>Zona B</th>
              <th>Gerente</th>
              <th>Coordinador</th>
              <th>Casa - Oficina</th>
              <th>Oficina - Campo</th>
              <th>Campo - Oficina</th>
              <th>Oficina - Casa</th>
            </tr>
          </thead>
          <tbody>
            @for (row of tableData; track row.id) {
              <tr [class.day-start]="row.isFirstOfDay">
                <td [attr.rowspan]="row.rowspan" *ngIf="row.showWeekData" class="week-data">{{ row.produccionSemana }}</td>
                <td [attr.rowspan]="row.rowspan" *ngIf="row.showWeekData" class="week-data">{{ row.metaProduccion }}</td>
                <td [attr.rowspan]="row.rowspan" *ngIf="row.showWeekData" class="week-data">{{ row.metaProspectos }}</td>
                <td [attr.rowspan]="row.rowspan" *ngIf="row.showWeekData" class="week-data">{{ row.totalProspectos }}</td>
                <td class="dia-cell">{{ row.dia }}</td>
                <td class="hora-cell">{{ row.horaInicio }}</td>
                <td><input pInputText type="text" class="cell-input" /></td>
                <td><input pInputText type="text" class="cell-input" /></td>
                <td><input pInputText type="text" class="cell-input" /></td>
                <td>
                  <p-tag *ngIf="row.coordinadorNoDisponible" value="No Disponible" severity="danger" />
                  <input *ngIf="!row.coordinadorNoDisponible" pInputText type="text" class="cell-input" />
                </td>
                <td>
                  <p-tag *ngIf="row.transporteNoDisponible" value="No Disponible" severity="danger" />
                  <input *ngIf="!row.transporteNoDisponible" pInputText type="text" class="cell-input" />
                </td>
                <td>
                  <p-tag *ngIf="row.transporteNoDisponible" value="No Disponible" severity="danger" />
                  <input *ngIf="!row.transporteNoDisponible" pInputText type="text" class="cell-input" />
                </td>
                <td>
                  <p-tag *ngIf="row.transporteNoDisponible" value="No Disponible" severity="danger" />
                  <input *ngIf="!row.transporteNoDisponible" pInputText type="text" class="cell-input" />
                </td>
                <td>
                  <p-tag *ngIf="row.transporteNoDisponible" value="No Disponible" severity="danger" />
                  <input *ngIf="!row.transporteNoDisponible" pInputText type="text" class="cell-input" />
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .plan-semanal-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 0.5rem;
    }

    .info-query-section, .table-container {
      padding: 1rem 0;
    }

    .query-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }

    .query-field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .query-field label {
      font-weight: 600;
      font-size: 0.85rem;
      color: var(--text-color);
    }

    .table-container {
      overflow-x: auto;
    }

    .plan-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.75rem;
      min-width: 1200px;
    }

    .plan-table th,
    .plan-table td {
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
      white-space: nowrap;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .plan-table tbody tr:hover {
      background-color: var(--surface-hover);
    }

    .plan-table tbody tr.day-start {
      border-top: 2px solid var(--surface-border);
    }

    .week-data {
      background: var(--surface-50);
      font-weight: 500;
    }

    .dia-cell {
      font-weight: 600;
      white-space: nowrap;
    }

    .hora-cell {
      font-weight: 500;
    }

    .cell-input {
      width: 100%;
      min-width: 60px;
      max-width: 100px;
      padding: 0.25rem 0.35rem !important;
      font-size: 0.7rem !important;
      text-align: center;
    }

    :host ::ng-deep .p-tag {
      font-size: 0.75rem;
      padding: 0.15rem 0.4rem;
    }
  `]
})
export class PlanSemanalComponent {
  tableData = this.generateTableData();

  generateTableData() {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const horas = ['08:00', '10:00', '12:00'];
    const data: any[] = [];
    let id = 0;
    dias.forEach((dia, diaIndex) => {
      horas.forEach((hora, horaIndex) => {
        const isLastHour = hora === '12:00';
        data.push({
          id: id++,
          dia: horaIndex === 0 ? dia : '',
          horaInicio: hora,
          showWeekData: horaIndex === 0,
          rowspan: 3,
          isFirstOfDay: horaIndex === 0,
          produccionSemana: '',
          metaProduccion: '',
          metaProspectos: '',
          totalProspectos: '',
          coordinadorNoDisponible: isLastHour,
          transporteNoDisponible: isLastHour
        });
      });
    });

    return data;
  }
}
