// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    /*if (!this.authService.isAuthenticated()) {
      //this.router.navigate(['/auth/login']);
    } else {
      this.router.navigate(['/feed']);
    }*/
  }
}
