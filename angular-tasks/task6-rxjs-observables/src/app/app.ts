import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, interval, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  title = 'Task 6: RxJS Observables & Reactive Data Streams';

  // 1. Live Timer Stream Observable
  timer$: Observable<number> = interval(1000);
  evenTimer$: Observable<number> = this.timer$.pipe(
    filter(val => val % 2 === 0)
  );

  // 2. Reactive BehaviorSubject state stream (Context / Redux store equivalent)
  private itemsSubject = new BehaviorSubject<string[]>([
    'RxJS Observable Stream',
    'Angular Async Pipe',
    'BehaviorSubject Reactive State'
  ]);

  // Expose as read-only Observable
  items$: Observable<string[]> = this.itemsSubject.asObservable();

  // Manual subscription tracker for ngOnDestroy demonstration
  manualSub!: Subscription;
  manualLog: number = 0;

  ngOnInit(): void {
    // Manual subscription (must be unsubscribed in ngOnDestroy!)
    this.manualSub = this.timer$.subscribe(val => {
      this.manualLog = val;
    });
  }

  addItem(inputElement: HTMLInputElement): void {
    const text = inputElement.value.trim();
    if (text) {
      const current = this.itemsSubject.getValue();
      this.itemsSubject.next([...current, text]);
      inputElement.value = '';
    }
  }

  ngOnDestroy(): void {
    // Prevent memory leaks!
    if (this.manualSub) {
      this.manualSub.unsubscribe();
    }
  }
}
