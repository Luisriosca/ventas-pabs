import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ButtonModule } from 'primeng/button';

registerLocaleData(localeEs, 'es-ES');

@Component({
    selector: 'app-day-selector-bar',
    template: `
        <div class="date-selector flex align-items-center justify-content-center gap-2 border-1 surface-border border-round p-2 bg-surface-0">
            <button 
                pButton 
                type="button" 
                icon="pi pi-angle-left" 
                class="p-button-text p-button-rounded p-button-secondary p-button-sm"
                (click)="previousDay()">
            </button>
            <div class="flex align-items-center gap-2 px-4 date-display">
                <i class="pi pi-calendar text-primary text-xl"></i>
                <span class="text-sm font-bold text-700 uppercase">
                    {{ selectedDate | date:'dd / MMM / yyyy':'':'es-ES' }}
                </span>
            </div>
            <button 
                pButton 
                type="button" 
                icon="pi pi-angle-right" 
                class="p-button-text p-button-rounded p-button-secondary p-button-sm"
                (click)="nextDay()">
            </button>
        </div>
    `,
    styles: [`
        :host {
            display: block;
        }
        .date-selector {
            background-color: #eeeeee;
        }
        .date-display {
            min-width: 200px;
            justify-content: center;
        }
        .uppercase {
            text-transform: uppercase;
        }
    `],
    standalone: true,
    imports: [CommonModule, ButtonModule]
})
export class DaySelectorBarComponent implements OnInit, OnChanges {
    @Input() selectedDate: Date = new Date();
    @Output() dateChange = new EventEmitter<Date>();

    constructor() { }

    ngOnInit(): void {
        if (!this.selectedDate) {
            this.selectedDate = new Date();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['selectedDate'] && changes['selectedDate'].currentValue) {
            this.selectedDate = new Date(changes['selectedDate'].currentValue);
        }
        console.log('se a cambiado al fecha:', this.selectedDate);
    }

    previousDay(): void {
        const previous = new Date(this.selectedDate);
        previous.setDate(previous.getDate() - 1);
        this.selectedDate = previous;
        this.dateChange.emit(this.selectedDate);
    }

    nextDay(): void {
        const next = new Date(this.selectedDate);
        next.setDate(next.getDate() + 1);
        this.selectedDate = next;
        this.dateChange.emit(this.selectedDate);
    }
}
