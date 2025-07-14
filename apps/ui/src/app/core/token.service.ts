import { Injectable } from '@angular/core';
import { getUserInfoFromToken } from './user-info.util';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private TOKEN_KEY = 'access_token';

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getUserInfo(): { name?: string; email?: string } {
    return getUserInfoFromToken(this.getToken());
  }
}
