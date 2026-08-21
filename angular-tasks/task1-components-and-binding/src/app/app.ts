import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Component State Properties (React equivalent: useState)
  title = 'Task 1: Component + Template & Data Binding';
  reactMapping = "Function Component + JSX ➔ Angular @Component Class + Template HTML";
  
  userName: string = 'Murali Krishna';
  userRole: string = 'Full-Stack Developer';
  isAccountActive: boolean = true;
  clickCount: number = 0;
  inputText: string = 'Try typing here!';

  // Event Handler Methods (React equivalent: onClick functions)
  incrementCounter(): void {
    this.clickCount++;
  }

  toggleAccountStatus(): void {
    this.isAccountActive = !this.isAccountActive;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputText = target.value;
  }
}
