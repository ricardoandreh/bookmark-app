import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  category: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class BookmarksService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  list(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(`${this.apiUrl}/bookmarks`);
  }

  get(id: string): Observable<Bookmark> {
    return this.http.get<Bookmark>(`${this.apiUrl}/bookmarks/${id}`);
  }

  create(bookmark: Partial<Bookmark>): Observable<Bookmark> {
    return this.http.post<Bookmark>(`${this.apiUrl}/bookmarks`, bookmark);
  }

  update(id: string, bookmark: Partial<Bookmark>): Observable<Bookmark> {
    return this.http.put<Bookmark>(
      `${this.apiUrl}/bookmarks/${id}`,
      bookmark,
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bookmarks/${id}`);
  }
}
