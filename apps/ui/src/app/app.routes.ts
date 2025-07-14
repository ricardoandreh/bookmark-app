import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'bookmarks',
    loadChildren: () =>
      import('./bookmarks/bookmarks.module').then((m) => m.BookmarksModule),
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'bookmarks', pathMatch: 'full' },
  { path: '**', redirectTo: 'bookmarks' },
];
