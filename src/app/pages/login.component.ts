import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule
  ],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="logo-wrapper">
            <img src="/svg/ventasicon.svg" alt="PABS Logo" class="logo-img" />
          </div>
          <div class="header-content">
            <h1>Bienvenido</h1>
            <p>Sistema de ventas - PABS</p>
          </div>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input 
              pInputText 
              id="email" 
              type="email" 
              placeholder="Correo electrónico" 
              formControlName="email"
            />
            <div class="error-message" *ngIf="isFieldInvalid('email')">
              <small *ngIf="loginForm.get('email')?.hasError('required')">El correo es requerido</small>
              <small *ngIf="loginForm.get('email')?.hasError('email')">Correo inválido</small>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
              pInputText 
              id="password" 
              type="password" 
              placeholder="Contraseña" 
              formControlName="password"
            />
            <div class="error-message" *ngIf="isFieldInvalid('password')">
              <small *ngIf="loginForm.get('password')?.hasError('required')">La contraseña es requerida</small>
              <small *ngIf="loginForm.get('password')?.hasError('minlength')">Mínimo 6 caracteres</small>
            </div>
          </div>

          <button 
            pButton 
            type="submit"
            [disabled]="loginForm.invalid"
            class="btn-signin"
          >
            <i class="pi pi-sign-in"></i>
            <span>Iniciar Sesión</span>
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      overflow: hidden;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('/img/bg.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        filter: brightness(0.4);
        z-index: 0;
      }
    }

    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 28rem;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      position: relative;
      z-index: 1;
    }

    .login-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      text-align: center;
    }

    .logo-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-img {
      width: 3rem;
      height: 3rem;
      filter: drop-shadow(0 0 8px rgba(79, 70, 229, 0.1));
    }

    .header-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      h1 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: #1f2937;
        line-height: 1.25;
      }
      p {
        margin: 0;
        font-size: 0.875rem;
        color: #6b7280;
      }
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      label {
        font-size: 0.875rem;
        font-weight: 500;
        color: #1f2937;
        line-height: 1.5;
      }
      input {
        width: 100%;

        &::placeholder {
          color: #d1d5db;
        }
      }
    }

    .error-message {
      margin-top: 0.25rem;
      font-size: 0.75rem;
      color: #ef4444;
      min-height: 1rem;
      small {
        display: block;
      }
    }

    .btn-signin {
      width: 100%;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      transition: all 0.3s ease;
      i {
        font-size: 1rem;
        line-height: 1;
      }
      span {
        line-height: 1;
      }
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  `]
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router) {}

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('login:', this.loginForm.value);
      this.router.navigate(['/home']);
    }
  }
}