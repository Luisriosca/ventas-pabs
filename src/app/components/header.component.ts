import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule, RouterLinkActive, ButtonModule],
    template: `
    <header class="header-container">
      <div class="header-content">
        <div class="logo-section">
          <div class="logo-icon">
            <i class="pi pi-fw pi-shopping-cart"></i>
          </div>
          <div class="logo-text-section">
            <div class="logo-title">Sistema de Ventas</div>
            <div class="logo-subtitle">PABS</div>
          </div>
        </div>
        <nav class="nav-menu">
          <div 
            *ngFor="let item of menuItems"
            class="nav-item-wrapper"
            [class.has-submenu]="item.items && item.items.length > 0">
            <a 
              [routerLink]="item.routerLink || null" 
              routerLinkActive="active"
              [routerLinkActiveOptions]="{exact: true}"
              [class.active-parent]="isParentActive(item)"
              class="nav-item">
              <i [class]="item.icon"></i>
              <span>{{ item.label }}</span>
              <i *ngIf="item.items && item.items.length > 0" class="pi pi-fw pi-chevron-down submenu-arrow"></i>
            </a>
            <div *ngIf="item.items && item.items.length > 0" class="submenu">
              <a 
                *ngFor="let subitem of item.items"
                [routerLink]="subitem.routerLink"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{exact: true}"
                class="submenu-item">
                <i [class]="subitem.icon"></i>
                <span>{{ subitem.label }}</span>
              </a>
            </div>
          </div>
        </nav>
        <div class="header-actions">
          <button pButton type="button" icon="pi pi-bell" class="p-button-rounded p-button-text p-button-plain"></button>
          <button pButton type="button" icon="pi pi-sign-out" class="p-button-rounded p-button-text p-button-plain logout-btn" (click)="logout()" title="Logout"></button>
        </div>
      </div>
    </header>
  `,
    styles: [`
    .header-container {
      background: #ffffff;
      border-bottom: 1px solid #e5e7eb;
      padding: 0;
      position: sticky;
      top: 0;
      box-shadow: none;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 1.5rem;
      max-width: 100%;
      margin: 0;
      width: 100%;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-width: auto;
    }

    .logo-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: #10b981;
      border-radius: 8px;
      font-size: 1.5rem;
      color: white;
    }

    .logo-text-section {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .logo-title {
      font-size: 0.95rem;
      font-weight: 600;
      color: #1f2937;
      line-height: 1.2;
    }

    .logo-subtitle {
      font-size: 0.75rem;
      color: #6b7280;
      line-height: 1;
    }

    .nav-menu {
      display: flex;
      gap: 5px;
      align-items: center;
      flex: 1;
      margin: 0 2rem;
    }

    .nav-item-wrapper {
      position: relative;
    }

    .nav-item-wrapper.has-submenu {
      display: flex;
      align-items: center;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      text-decoration: none;
      color: #000000;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.2s ease;
      position: relative;
      white-space: nowrap;
      border: 1px solid transparent;
    }

    .submenu-arrow {
      font-size: 0.75rem !important;
      transition: transform 0.2s ease;
    }

    .nav-item-wrapper.has-submenu:hover .submenu-arrow {
      transform: rotate(180deg);
    }

    .nav-item i {
      font-size: 1rem;
    }

    .nav-item:hover {
      background: #00ffaa2c;
      border: 1px solid #10b981;
      border-radius: 6px;
    }

    .nav-item.active,.nav-item.active-parent  {
      color: white;
      background: #10b981;
      border-radius: 6px;
    }

    .submenu {
      position: absolute;
      top: 100%;
      left: 0;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      margin-top: 0.5rem;
      padding: 0.5rem 0;
      min-width: 200px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.2s ease;
      z-index: 10;
    }

    .nav-item-wrapper:hover .submenu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .submenu-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      text-decoration: none;
      color: #1f2937;
      font-size: 0.85rem;
      font-weight: 500;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .submenu-item i {
      font-size: 0.9rem;
    }

    .submenu-item:hover {
      background: #f3f4f6;
      color: #10b981;
    }

    .submenu-item.active {
      background: #ecfdf5;
      color: #10b981;
      border-left: 3px solid #10b981;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    :host ::ng-deep .p-button.p-button-rounded {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }

    :host ::ng-deep .p-button.p-button-text {
      color: #6b7280;
    }

    :host ::ng-deep .p-button.p-button-text:hover {
      background: #00ffaa2c;
      border: 1px solid #10b981;
    }

    :host ::ng-deep .user-btn {
      background: #f3f4f6;
      color: #6b7280;
      font-weight: 600;
    }

    :host ::ng-deep .user-btn:hover {
      background: #e5e7eb;
    }

    :host ::ng-deep .logout-btn:hover {
      background: #ef44445e !important;
      border: 1px solid #ef4444 !important;
      color: black !important;
    }
    `]
})
export class HeaderComponent implements OnInit {
    menuItems: any[] = [];

    constructor(private router: Router) { }

    ngOnInit() {
        this.initializeMenuItems();
    }

    logout() {
        this.router.navigate(['/login']);
    }

    isParentActive(item: any): boolean {
        if (item.items && item.items.length > 0) {
            return item.items.some((subitem: any) => this.router.url.includes(subitem.routerLink));
        }
        return false;
    }

    initializeMenuItems() {
        this.menuItems = [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                routerLink: '/home'
            },
            {
                label: 'Prospección',
                icon: 'pi pi-fw pi-search',
                items: [
                    {
                        label: 'Plan Semanal',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: '/plan-semanal'
                    },
                    {
                        label: 'Cortes',
                        icon: 'pi pi-fw pi-file',
                        routerLink: '/cortes'
                    }
                ]
            },
            {
                label: 'KPI Vendedor',
                icon: 'pi pi-fw pi-chart-bar',
                routerLink: '/kpi-vendedor'
            },
        ];
    }
}
