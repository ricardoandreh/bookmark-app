import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      tap((loggedIn) => {
        if (loggedIn) this.router.navigate(['/bookmarks']);
      }),
      map((loggedIn) => !loggedIn),
    );
  }
}
