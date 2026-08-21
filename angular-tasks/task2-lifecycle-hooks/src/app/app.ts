import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from './child.component';

export interface LogEntry {
  timestamp: string;
  message: string;
  type: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChildComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Task 2: Angular Lifecycle Hooks vs useEffect';
  showChild: boolean = true;
  parentCounter: number = 1;
  logs: LogEntry[] = [];

  constructor() {
    this.addLog('Parent Component Initialized', 'init');
  }

  addLog = (message: string, type: string = 'info') => {
    const time = new Date().toLocaleTimeString();
    this.logs.unshift({ timestamp: time, message, type });
  }

  toggleChild(): void {
    this.showChild = !this.showChild;
  }

  incrementParentCounter(): void {
    this.parentCounter++;
  }

  clearLogs(): void {
    this.logs = [];
  }
}
