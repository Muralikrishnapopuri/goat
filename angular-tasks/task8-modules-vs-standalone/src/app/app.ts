import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, // Modern Angular 14+ default paradigm
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Task 8: NgModule vs Standalone Components';
  selectedArchitecture: 'standalone' | 'ngmodule' = 'standalone';

  setArchitecture(mode: 'standalone' | 'ngmodule'): void {
    this.selectedArchitecture = mode;
  }
}
