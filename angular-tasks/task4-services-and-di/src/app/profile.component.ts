import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-profile-editor',
  standalone: true,
  template: `
    <div style="padding: 1rem; background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 0.5rem; margin-top: 1rem;">
      <h4 style="color: #a78bfa; margin-bottom: 0.5rem;">Profile Editor Component (Injected UserService)</h4>
      
      <div style="margin-top: 0.5rem;">
        <label style="display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.25rem;">Update Name in Shared Service:</label>
        <input 
          type="text" 
          [value]="userService.getUser().name" 
          (input)="onNameInput($event)"
          style="padding: 0.5rem; background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.4rem; color: white; width: 100%;"
        />
      </div>

      <button class="btn" style="margin-top: 0.75rem;" (click)="userService.toggleLoginStatus()">
        Toggle Login Status in Service
      </button>
    </div>
  `
})
export class ProfileComponent {
  constructor(public userService: UserService) {}

  onNameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.userService.updateName(input.value);
  }
}
