# Angular for React Developers: Fast-Track Crash Course

Welcome! If you already know **React**, learning **Angular** is much easier than starting from scratch. Both frameworks share fundamental UI paradigms: components, props, state, lifecycle events, and routing.

However, **Angular is an opinionated, batteries-included framework**, whereas React is a lightweight view library that relies on an ecosystem of external packages.

---

## 1. High-Level Definition & Mental Shift

### What is Angular?

**Angular** (maintained by Google) is a full-featured, TypeScript-based web application framework. It provides out-of-the-box solutions for:

- Form handling (`ReactiveFormsModule` / `FormsModule`)
- HTTP requests (`HttpClient`)
- Routing (`RouterModule`)
- State management & Dependency Injection (`@Injectable`)
- Reactive Programming (`RxJS`)

### React vs. Angular: The Mental Shift

| Aspect                     | React                                                                   | Angular                                                                 |
| :------------------------- | :---------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| **Architecture**     | Library (Pick your own router, state management, form library)          | Framework (Everything included standard)                                |
| **Component File**   | Co-located JS/TS + JSX (`.jsx` / `.tsx`)                            | Separated Logic (`.ts`), Template (`.html`), and Styles (`.css`)  |
| **Reactivity Model** | Re-runs component function on state change (`useState`, VDOM diffing) | Zone.js / Signals trigger Change Detection on dirty checking properties |
| **Data Binding**     | Strictly 1-Way Data Binding (`value={state}` + `onChange`)          | 1-Way (`[prop]`, `(event)`) AND 2-Way (`[(ngModel)]`)             |
| **Shared State**     | Context API, Redux, Zustand, Custom Hooks                               | Services + Dependency Injection (Singleton instances)                   |
| **Async Operations** | Promises /`async-await` / `useEffect`                               | RxJS Observables (Streams of data over time)                            |

---

## 2. Concept Mapping (React ➔ Angular)

Here is your exact mapping cheat sheet to ramp up in minutes:

---

### Concept 1: Component + Template + `@Component` Decorator

* **React Equivalent:** Function Component + JSX
* **What to say:** *"Angular splits template/logic by file, React co-locates them — I'm used to the co-located style, but the concepts map 1:1."*
* **Detailed Breakdown:**
  In React, you write JSX inside the component function. In Angular, you decorate a standard TypeScript class with `@Component({ selector, templateUrl, styleUrls })`.

```tsx
// REACT
export function UserProfile({ name }) {
  return <div className="card">Hello, {name}!</div>;
}
```

```typescript
// ANGULAR (Standalone Component)
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  template: `<div class="card">Hello, {{ name }}!</div>`,
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  @Input() name: string = '';
}
```

---

### Concept 2: `ngOnInit`

* **React Equivalent:** `useEffect(() => {}, [])`
* **What to say:** *"Runs once after component initializes and inputs are bound. Perfect for API calls."*
* **Detailed Breakdown:**
  In React, empty dependency `useEffect` runs after mount. In Angular, implement the `OnInit` interface and write `ngOnInit()`.

```tsx
// REACT
useEffect(() => {
  fetchData();
}, []);
```

```typescript
// ANGULAR
export class UserListComponent implements OnInit {
  ngOnInit(): void {
    this.fetchData();
  }
}
```

---

### Concept 3: `ngOnChanges`

* **React Equivalent:** `useEffect` watching specific props `useEffect(() => {}, [propA, propB])`
* **What to say:** *"Fires whenever `@Input()` bound values change from parent."*
* **Detailed Breakdown:**
  `ngOnChanges(changes: SimpleChanges)` receives an object containing previous and current values of changed `@Input()` properties before `ngOnInit` and whenever inputs update.

```tsx
// REACT
useEffect(() => {
  console.log('User ID changed:', userId);
}, [userId]);
```

```typescript
// ANGULAR
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({ ... })
export class UserDetailComponent implements OnChanges {
  @Input() userId!: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      console.log('User ID changed:', changes['userId'].currentValue);
    }
  }
}
```

---

### Concept 4: `ngOnDestroy`

* **React Equivalent:** `useEffect` cleanup function `useEffect(() => { return () => cleanup(); }, [])`
* **What to say:** *"Cleanup hook called right before component is unmounted. Used to unsubscribe from Observables and clear timers."*
* **Detailed Breakdown:**
  Prevents memory leaks in Angular apps.

```tsx
// REACT
useEffect(() => {
  const timer = setInterval(() => console.log('tick'), 1000);
  return () => clearInterval(timer); // Cleanup
}, []);
```

```typescript
// ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({ ... })
export class TimerComponent implements OnInit, OnDestroy {
  private timerId: any;

  ngOnInit(): void {
    this.timerId = setInterval(() => console.log('tick'), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId); // Cleanup
  }
}
```

---

### Concept 5: `@Input()`

* **React Equivalent:** Props (passing data down from parent to child)
* **What to say:** *"Parent passes data down to child component using `@Input()` property binding `[childProp]="parentData"`."*

```tsx
// REACT
<ChildComponent user={currentUser} />
```

```html
<!-- ANGULAR TEMPLATE -->
<app-child [user]="currentUser"></app-child>
```

```typescript
// Child Component TS
@Input() user: User;
```

---

### Concept 6: `@Output()` + `EventEmitter`

* **React Equivalent:** Callback prop (e.g., `onSave={(data) => handleSave(data)}`)
* **What to say:** *"Child emits custom events up to the parent using `@Output() property = new EventEmitter()`."*

```tsx
// REACT
<ChildComponent onSave={(item) => saveItem(item)} />
```

```typescript
// ANGULAR Child Component TS
@Output() save = new EventEmitter<Item>();

onButtonClick() {
  this.save.emit(this.newItem);
}
```

```html
<!-- ANGULAR Parent Component Template -->
<app-child (save)="saveItem($event)"></app-child>
```

---

### Concept 7: Services + Dependency Injection (DI)

* **React Equivalent:** Context API / Custom Hooks / Redux
* **What to say:** *"Shared logic or state is injected via Angular's Dependency Injection system into component constructors rather than manually importing or passing context."*

```tsx
// REACT (Context / Hook)
const { user, logout } = useAuth();
```

```typescript
// ANGULAR Service
@Injectable({ providedIn: 'root' })
export class AuthService {
  user = { name: 'Murali' };
  logout() { /* ... */ }
}

// Injected into Component:
@Component({ ... })
export class HeaderComponent {
  constructor(public authService: AuthService) {}
}
```

---

### Concept 8: `[(ngModel)]` (Two-Way Data Binding)

* **React Equivalent:** Controlled Input (`value={state}` + `onChange={(e) => setState(e.target.value)}`)
* **What to say:** *"Two-way data binding automatically keeps template input value and TypeScript class variable in sync. Remember the syntax: Banana in a Box `[(ngModel)]`."*

```tsx
// REACT
<input value={username} onChange={(e) => setUsername(e.target.value)} />
```

```html
<!-- ANGULAR (requires FormsModule) -->
<input [(ngModel)]="username" />
<p>Hello, {{ username }}</p>
```

---

### Concept 9: RxJS Observables

* **React Equivalent:** Promises / `async-await` / Event Listeners
* **What to say:** *"RxJS Observables represent streams of values over time (multi-value emission), whereas Promises emit a single resolved value in the future."*
* **Detailed Breakdown:**
  Angular `HttpClient` returns RxJS Observables. You can handle them using `.subscribe()` or cleanly in HTML using the `async` pipe (`| async`).

```tsx
// REACT (Promise)
useEffect(() => {
  axios.get('/api/users').then(res => setUsers(res.data));
}, []);
```

```typescript
// ANGULAR (Observable + Async Pipe)
// Component TS
users$ = this.http.get<User[]>('/api/users');

// Component HTML
<li *ngFor="let user of users$ | async">{{ user.name }}</li>
```

---

### Concept 10: Modules (`NgModule`) vs. Standalone Components

* **React Equivalent:** Standard ES module import / folder structure.
* **What to say:** *"Traditionally Angular grouped components, services, and pipes in `NgModule`. Modern Angular (v14+) uses Standalone Components where components import their own dependencies directly like React."*

```typescript
// MODERN STANDALONE COMPONENT (Angular 14+)
@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `...`
})
export class CounterComponent {}
```

---

### Concept 11: Angular Router & Route Guards

* **React Equivalent:** React Router (`<Routes>`, `<Route>`, `useNavigate()`, Protected Route wrappers)
* **What to say:** *"Similar route configuration array with `path` and `component`. Route Guards (`CanActivateFn`) act like Protected Routes to check authentication before entering a route."*

```typescript
// ANGULAR ROUTE CONFIG (app.routes.ts)
export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
```

```html
<!-- ANGULAR ROUTER OUTLET -->
<nav>
  <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
</nav>
<router-outlet></router-outlet>
```

---

## 3. WHAT YOU MUST REMEMBER (Golden Rules & Interview Highlights)

### 1. The "Banana in a Box" Syntax Rule

- Two-way binding syntax is `[(ngModel)]`.
- 
- **Memory Trick:** "Banana in a box" -> parentheses `()` [banana] inside square brackets `[]` [box].
- Property binding (data IN to component): `[property]="value"`
- Event binding (events OUT of component): `(event)="handler()"`

### 2. Angular Change Detection & TrackBy

- Angular uses Zone.js to detect standard async events (clicks, HTTP responses, setTimeout) and trigger template updates.
- In `*ngFor` (or `@for` in Angular 17+), always specify `trackBy` or `track` (similar to React's `key` prop) to avoid unnecessary DOM re-rendering.

### 3. Avoiding Memory Leaks with RxJS

- When subscribing manually to Observables via `.subscribe()`, you **MUST** unsubscribe in `ngOnDestroy()` or use operators like `takeUntilDestroyed()`.
- **Best Practice:** Use the `| async` pipe in templates. Angular automatically subscribes and unsubscribes for you!

### 4. Dependency Injection Scope

- `@Injectable({ providedIn: 'root' })` creates a single global **Singleton** instance across your entire app (like global React Context).
- Providing a service in `@Component({ providers: [MyService] })` creates a new isolated instance for that component and its children.

### 5. Template Directives Syntax (Classic vs Modern)

- **Classic Angular:** `*ngIf="condition"`, `*ngFor="let item of items"`
- **Modern Angular (v17+ Control Flow):** `@if (condition) { ... }`, `@for (item of items; track item.id) { ... }`

---

## 4. Quick Cheatsheet Summary

| Concept                 | React Code                                                  | Angular Code                                                       |
| :---------------------- | :---------------------------------------------------------- | :----------------------------------------------------------------- |
| Template Interpolation  | `{variable}`                                              | `{{ variable }}`                                                 |
| Property / Prop Binding | `attr={value}`                                            | `[attr]="value"`                                                 |
| Event Listener          | `onClick={handleClick}`                                   | `(click)="handleClick()"`                                        |
| Conditional Rendering   | `{isLoggedIn && <Dashboard />}`                           | `@if (isLoggedIn) { <app-dashboard /> }`                         |
| List Rendering          | `{items.map(item => <li key={item.id}>{item.name}</li>)}` | `@for (item of items; track item.id) { <li>{{item.name}}</li> }` |
| Local State             | `const [count, setCount] = useState(0);`                  | Class property`count = 0;`                                       |
| Ref Access              | `const inputRef = useRef(null);`                          | `@ViewChild('inputRef') inputRef!: ElementRef;`                  |

---

*This document accompanies the hands-on practical task applications located in `./angular-tasks/`.*
