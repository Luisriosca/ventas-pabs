import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './components/header.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-layout',
    template: `
        <div class="layout-container">
            <div class="green-section">
                <header class="header-wrapper">
                    <app-header></app-header>
                </header>
            </div>
            <main class="main-content">
                <div class="content-wrapper">
                    <p-toast />
                    <p-confirmDialog />
                    <router-outlet></router-outlet>
                </div>
            </main>
        </div>
    `,
    styles: [`
        .layout-container {
            height: 100vh;
            background: #eeeeee;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .header-wrapper {
            background: #10b981;
            padding: 0;
            flex-shrink: 0;
        }

        .main-content {
            flex: 1;
            padding: 0.5rem;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .content-wrapper {
            background: white;
            border: 1px solid #00000049;
            border-radius: 6px;
            padding: 1rem;
            flex: 1;
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
            overflow-y: auto;
        }
    `],
    standalone: true,
    imports: [
        RouterModule,
        ButtonModule,
        HeaderComponent,
        ToastModule,
        ConfirmDialogModule
    ],
    providers: [ConfirmationService, MessageService]
})
export class LayoutComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
