import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      tap((loggedIn) => {
        if (!loggedIn) this.router.navigate(['/auth/login']);
      }),
      map((loggedIn) => loggedIn),
    );
  }
}
