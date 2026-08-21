import { Injectable } from '@angular/core';

export interface UserState {
  name: string;
  role: string;
  isLoggedIn: boolean;
  theme: 'dark' | 'light';
}

@Injectable({
  providedIn: 'root' // Singleton provided globally across entire app
})
export class UserService {
  // Shared state held inside Service (React Context equivalent)
  private user: UserState = {
    name: 'Murali Krishna',
    role: 'Senior React & Angular Developer',
    isLoggedIn: true,
    theme: 'dark'
  };

  getUser(): UserState {
    return this.user;
  }

  toggleLoginStatus(): void {
    this.user.isLoggedIn = !this.user.isLoggedIn;
  }

  updateName(newName: string): void {
    this.user.name = newName;
  }
}
