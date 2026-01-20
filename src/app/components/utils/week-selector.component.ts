import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ButtonModule } from 'primeng/button';

registerLocaleData(localeEs, 'es-ES');

@Component({
    selector: 'app-week-selector-bar',
    template: `
        <div class="week-selector flex align-items-center justify-content-center gap-2 border-1 surface-border border-round p-2">
            <button 
                pButton 
                type="button" 
                icon="pi pi-angle-left" 
                class="p-button-text p-button-rounded p-button-secondary p-button-sm"
                (click)="previousWeek()">
            </button>
            <div class="flex align-items-center gap-2 px-3 week-display">
                <i class="pi pi-calendar-plus text-primary text-xl"></i>
                <div class="flex flex-column align-items-center">
                    <span class="text-xs font-semibold text-500 uppercase">Semana</span>
                    <span class="text-sm font-bold text-700 uppercase">
                        {{ weekStart | date:'dd MMM' }} - {{ weekEnd | date:'dd MMM yyyy' }}
                    </span>
                </div>
            </div>
            <button 
                pButton 
                type="button" 
                icon="pi pi-angle-right" 
                class="p-button-text p-button-rounded p-button-secondary p-button-sm"
                (click)="nextWeek()">
            </button>
        </div>
    `,
    styles: [`
        :host {
            display: block;
        }
        .week-selector {
            background-color: #eeeeee;
            min-width: 250px;
        }
        .week-display {
            min-width: 180px;
            justify-content: center;
        }
        .uppercase {
            text-transform: uppercase;
        }
    `],
    standalone: true,
    imports: [CommonModule, ButtonModule]
})
export class WeekSelectorBarComponent implements OnInit, OnChanges {
    @Input() referenceDate: Date = new Date();
    @Output() weekChange = new EventEmitter<{ start: Date, end: Date }>();

    weekStart: Date = new Date();
    weekEnd: Date = new Date();

    constructor() { }

    ngOnInit(): void {
        this.calculateWeekRange(this.referenceDate);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['referenceDate'] && changes['referenceDate'].currentValue) {
            this.calculateWeekRange(new Date(changes['referenceDate'].currentValue));
        }
    }

    calculateWeekRange(date: Date): void {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);        
        this.weekStart = new Date(d.setDate(diff));
        this.weekStart.setHours(0, 0, 0, 0);
        this.weekEnd = new Date(this.weekStart);
        this.weekEnd.setDate(this.weekStart.getDate() + 6);
        this.weekEnd.setHours(23, 59, 59, 999);
        this.weekChange.emit({ start: this.weekStart, end: this.weekEnd });
    }

    previousWeek(): void {
        const prev = new Date(this.weekStart);
        prev.setDate(prev.getDate() - 7);
        this.calculateWeekRange(prev);
    }

    nextWeek(): void {
        const next = new Date(this.weekStart);
        next.setDate(next.getDate() + 7);
        this.calculateWeekRange(next);
    }
}
