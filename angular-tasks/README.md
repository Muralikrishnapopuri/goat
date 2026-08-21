# Angular Practical Learning Tasks (For React Developers)

Each directory below is an independent, self-contained Angular application configured to run on its own dedicated development server port.

## 🚀 Task Directory & Server Ports

| Directory | Core Concept Demonstrated | React Equivalent | Server Port | Run Command |
| :--- | :--- | :--- | :--- | :--- |
| **`task1-components-and-binding`** | Component, Template, Interpolation, Property & Event Binding | Function component + JSX | **4201** | `cd task1-components-and-binding && npm start` |
| **`task2-lifecycle-hooks`** | `ngOnInit`, `ngOnChanges`, `ngOnDestroy` | `useEffect` hooks (mount, props, cleanup) | **4202** | `cd task2-lifecycle-hooks && npm start` |
| **`task3-input-output-props`** | `@Input()` & `@Output() + EventEmitter` | Props down & Callback event up | **4203** | `cd task3-input-output-props && npm start` |
| **`task4-services-and-di`** | `@Injectable()` Service & Dependency Injection | Context API / Custom Hooks / Redux | **4204** | `cd task4-services-and-di && npm start` |
| **`task5-two-way-binding-ngmodel`** | `[(ngModel)]` Two-Way Data Binding | Controlled inputs (`value` + `onChange`) | **4205** | `cd task5-two-way-binding-ngmodel && npm start` |
| **`task6-rxjs-observables`** | RxJS Observables, BehaviorSubject, `async` pipe | Promises / async-await / streams | **4206** | `cd task6-rxjs-observables && npm start` |
| **`task7-routing-and-guards`** | Angular Router & `CanActivateFn` Auth Guard | React Router & Protected Routes | **4207** | `cd task7-routing-and-guards && npm start` |
| **`task8-modules-vs-standalone`** | `NgModule` vs Modern Standalone Components | Folder/import structure in React | **4208** | `cd task8-modules-vs-standalone && npm start` |

---

## 💡 How to Run Any Task Application

1. Open a terminal in the task directory of your choice, e.g.:
   ```bash
   cd angular-tasks/task1-components-and-binding
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the application server:
   ```bash
   npm start
   ```
4. Open your browser at `http://localhost:<PORT>` (e.g., `http://localhost:4201`).
