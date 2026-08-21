import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child-timer',
  standalone: true,
  template: `
    <div style="background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(139, 92, 246, 0.4); border-radius: 0.5rem; padding: 1.25rem; margin-top: 1rem;">
      <h3 style="color: #a78bfa; margin-bottom: 0.5rem;">⏱️ Child Component Mounted</h3>
      <p>Received Prop (Count): <strong>{{ counterProp }}</strong></p>
      <p>Timer Ticks Running in Component: <strong>{{ ticks }}s</strong></p>
    </div>
  `
})
export class ChildComponent implements OnInit, OnChanges, OnDestroy {
  @Input() counterProp: number = 0;
  @Input() onLog!: (msg: string, type: string) => void;
  
  ticks: number = 0;
  private intervalId: any;

  // 1. ngOnInit: Equivalent to useEffect(() => {}, [])
  ngOnInit(): void {
    this.onLog('1. ngOnInit executed: Component mounted to DOM', 'init');
    this.intervalId = setInterval(() => {
      this.ticks++;
    }, 1000);
  }

  // 2. ngOnChanges: Equivalent to useEffect(() => {}, [counterProp])
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['counterProp']) {
      const prev = changes['counterProp'].previousValue;
      const curr = changes['counterProp'].currentValue;
      this.onLog(`2. ngOnChanges executed: counterProp changed from ${prev} ➔ ${curr}`, 'change');
    }
  }

  // 3. ngOnDestroy: Equivalent to useEffect return cleanup function () => clearInterval()
  ngOnDestroy(): void {
    this.onLog('3. ngOnDestroy executed: Cleaning up interval timer before unmount!', 'destroy');
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
