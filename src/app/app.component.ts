import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GosbiAngular';
  isLoading = false;
  subscription!: Subscription;

  constructor(private router: Router) {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Navigation started, show loading indicator
        this.isLoading = true;
      } else if (event instanceof NavigationEnd) {
        // Navigation ended, hide loading indicator
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
