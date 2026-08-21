import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  template: `
    <div style="padding: 1rem; background: rgba(59, 130, 246, 0.1); border-radius: 0.5rem; border: 1px solid rgba(59, 130, 246, 0.3);">
      <h2 style="color: #60a5fa;">🏠 Public Home Page</h2>
      <p style="margin-top: 0.5rem;">This page is accessible to everyone without authentication.</p>
    </div>
  `
})
export class HomeComponent {}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  template: `
    <div style="padding: 1rem; background: rgba(16, 185, 129, 0.1); border-radius: 0.5rem; border: 1px solid rgba(16, 185, 129, 0.3);">
      <h2 style="color: #34d399;">🔒 Protected Dashboard Page</h2>
      <p style="margin-top: 0.5rem; color: #a78bfa;">🎉 Welcome! You successfully passed the Angular <code>authGuard</code>!</p>
    </div>
  `
})
export class DashboardComponent {}

@Component({
  selector: 'app-unauthorized-page',
  standalone: true,
  template: `
    <div style="padding: 1rem; background: rgba(239, 68, 68, 0.1); border-radius: 0.5rem; border: 1px solid rgba(239, 68, 68, 0.3);">
      <h2 style="color: #f87171;">⛔ Access Denied (403 Unauthorized)</h2>
      <p style="margin-top: 0.5rem;">The Angular Route Guard blocked access to this route because you are logged out!</p>
    </div>
  `
})
export class UnauthorizedComponent {}
