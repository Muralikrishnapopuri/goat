import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { ProfileComponent } from './profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ProfileComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Task 4: Services & Dependency Injection (DI)';
}
