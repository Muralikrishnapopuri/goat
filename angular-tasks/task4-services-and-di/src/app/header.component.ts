import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <div style="padding: 1rem; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h4 style="color: #60a5fa; margin: 0;">Header Component (Injected UserService)</h4>
        <p style="font-size: 0.9rem; margin-top: 0.25rem;">User: <strong>{{ userService.getUser().name }}</strong></p>
      </div>

      <span [style.background]="userService.getUser().isLoggedIn ? '#10b981' : '#ef4444'" style="padding: 0.25rem 0.6rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700;">
        {{ userService.getUser().isLoggedIn ? 'LOGGED IN' : 'LOGGED OUT' }}
      </span>
    </div>
  `
})
export class HeaderComponent {
  // Dependency Injection in Constructor (or inject(UserService))
  constructor(public userService: UserService) {}
}
