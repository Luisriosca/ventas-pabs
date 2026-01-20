import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        CardModule,
        InputTextModule,
        IconFieldModule,
        InputIconModule,
        TableModule,
        TagModule
    ],
    template: `
    <p-card class="mb-3">
      <div class="flex flex-column md:flex-row md:align-items-center justify-content-between gap-3">
        <div class="flex align-items-center gap-2">
          <i class="pi pi-users text-2xl text-primary"></i>
          <h1 class="m-0 text-2xl font-bold">Gestión de Usuarios</h1>
        </div>
        <div class="flex flex-column sm:flex-row align-items-center gap-3">
          <p-iconfield iconPosition="left" class="w-full sm:w-auto">
            <p-inputicon class="pi pi-search"></p-inputicon>
            <input type="text" pInputText placeholder="Buscar usuario..." class="w-full sm:w-20rem" (input)="dt.filterGlobal($any($event.target).value, 'contains')" />
          </p-iconfield>
          <p-button label="Nuevo" icon="pi pi-plus" severity="success" class="w-full sm:w-auto"></p-button>
        </div>
      </div>
    </p-card>

    <p-table #dt [value]="usuarios" [rows]="10" [paginator]="true" [responsiveLayout]="'scroll'"
             [globalFilterFields]="['noEmpleado','nombre','email','telefono','rol']"
             currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} usuarios" 
             [showCurrentPageReport]="true"
             class="p-datatable-sm">
      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="nombre">Nombre <p-sortIcon field="nombre"></p-sortIcon></th>
          <th pSortableColumn="email">Correo <p-sortIcon field="email"></p-sortIcon></th>
          <th pSortableColumn="noEmpleado">No. Empleado <p-sortIcon field="noEmpleado"></p-sortIcon></th>
          <th pSortableColumn="telefono">Teléfono <p-sortIcon field="telefono"></p-sortIcon></th>
          <th pSortableColumn="rol">Rol <p-sortIcon field="rol"></p-sortIcon></th>
          <th pSortableColumn="experiencia">Experiencia <p-sortIcon field="experiencia"></p-sortIcon></th>
          <th pSortableColumn="estado">Estado <p-sortIcon field="estado"></p-sortIcon></th>
          <th style="width: 8rem">Acciones</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-usuario>
        <tr>
          <td class="font-semibold">{{usuario.nombre}}</td>
          <td>{{usuario.email}}</td>
          <td>{{usuario.noEmpleado}}</td>
          <td>{{usuario.telefono}}</td>
          <td>
            <p-tag [value]="usuario.rol" [severity]="getRolSeverity(usuario.rol)"></p-tag>
          </td>
          <td>{{usuario.experiencia}}</td>
          <td>
            <p-tag [value]="usuario.estado" [severity]="getSeverity(usuario.estado)"></p-tag>
          </td>
          <td>
            <div class="flex gap-2">
              <button pButton icon="pi pi-pencil" class="p-button-text p-button-rounded p-button-info"></button>
              <button pButton icon="pi pi-trash" class="p-button-text p-button-rounded p-button-danger"></button>
            </div>
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
    styles: []
})
export class UsuariosComponent implements OnInit {
    usuarios: any[] = [];

    ngOnInit() {
        this.usuarios = [
            { noEmpleado: '0001', nombre: 'Admin Sistema', email: 'admin@pabs.com', telefono: '123456789', rol: 'Administrador', experiencia: 'Experto en Marketing', estado: 'Activo' },
            { noEmpleado: '0002', nombre: 'Luis Rios', email: 'luis.rios@pabs.com', telefono: '654123987', rol: 'Administrador', experiencia: 'Estratega de Negocios', estado: 'Inactivo' },
            { noEmpleado: '0003', nombre: 'Giovanni Bones', email: 'giovanni.bones@pabs.com', telefono: '987321456', rol: 'Supervisor', experiencia: 'Gestión de Equipos', estado: 'Activo' },
            { noEmpleado: '0004', nombre: 'Diego Merino', email: 'diego.merino@pabs.com', telefono: '987654321', rol: 'Vendedor', experiencia: 'Experto en Ventas', estado: 'Activo' },
        ];
    }

    getSeverity(estado: string) {
        switch (estado) {
            case 'Activo': return 'success';
            case 'Inactivo': return 'danger';
            default: return 'info';
        }
    }

    getRolSeverity(rol: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | null | undefined {
        switch (rol) {
            case 'Administrador': return 'info';
            case 'Supervisor': return 'warn';
            case 'Vendedor': return 'success';
            default: return 'secondary';
        }
    }
}
