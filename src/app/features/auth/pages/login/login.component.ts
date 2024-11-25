// src/app/features/auth/pages/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../../../core/services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    /*this.errorMessage = '';
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        this.router.navigate(['/feed']);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Error al iniciar sesión';
        console.error('Login failed', error);
      }
    });*/
  }
}
