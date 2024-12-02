// src/app/app.component.ts
import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {AuthService} from './core/services/auth/auth.service';
import {LoadingService} from "@core/services/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isSidebarOpen = false;
  isLoading = this.loadingService.loading$;
  isAuthenticated = this.authService.isAuthenticated();

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  constructor(private authService: AuthService, private router: Router, private loadingService: LoadingService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loadingService.hide();
      }
    });
  }

  ngOnInit() {
    if (!this.isAuthenticated) {
    }
  }
}
