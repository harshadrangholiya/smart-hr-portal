import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smart-hr-ui';
  showHeader = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !['/auth/login', '/auth/register'].includes(event.urlAfterRedirects);
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
