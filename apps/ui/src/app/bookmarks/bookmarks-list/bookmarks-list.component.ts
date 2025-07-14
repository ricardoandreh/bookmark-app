import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../core/token.service';
import { Bookmark, BookmarksService } from '../bookmarks.service';

@Component({
  selector: 'app-bookmarks-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [DatePipe],
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss'],
})
export class BookmarksListComponent implements OnInit {
  bookmarks: Bookmark[] = [];
  loading = true;
  userName?: string;

  constructor(
    private bookmarksService: BookmarksService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
    const userInfo = this.tokenService.getUserInfo();
    this.userName = userInfo.name || userInfo.email || 'Usuário';
  }

  load() {
    this.loading = true;
    this.bookmarksService.list().subscribe({
      next: (data) => {
        this.bookmarks = data;
        this.loading = false;
      },
      error: () => {
        alert('Erro ao carregar bookmarks.');
        this.loading = false;
      },
    });
  }

  delete(id: string) {
    if (!confirm('Confirma exclusão do bookmark?')) return;
    this.bookmarksService.delete(id).subscribe({
      next: () => this.load(),
      error: () => alert('Erro ao excluir bookmark.'),
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
