import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Task 5: Two-Way Data Binding with [(ngModel)]';
  
  // Model state variables
  developerName: string = 'Murali Krishna';
  favoriteTech: string = 'Angular';
  experienceYears: number = 3;
  isAvailableForHire: boolean = true;

  resetForm(): void {
    this.developerName = '';
    this.favoriteTech = 'Angular';
    this.experienceYears = 1;
    this.isAvailableForHire = true;
  }
}
