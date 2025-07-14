import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenService } from '../core/token.service';

interface AuthResponse {
  access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private _loggedIn$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem('access_token'),
  );

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
    this._loggedIn$.next(!!this.tokenService.getToken());
  }

  isLoggedIn(): Observable<boolean> {
    this._loggedIn$.next(!!this.tokenService.getToken());
    return this._loggedIn$.asObservable();
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((response) => {
          this.tokenService.setToken(response.access_token);
          this._loggedIn$.next(true);
        }),
      );
  }

  logout(): void {
    this.tokenService.clearToken();
    this._loggedIn$.next(false);
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/register`, {
      name,
      email,
      password,
    });
  }
}
