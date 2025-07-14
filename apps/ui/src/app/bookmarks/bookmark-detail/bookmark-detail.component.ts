import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Bookmark, BookmarksService } from '../bookmarks.service';

@Component({
  selector: 'app-bookmark-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [DatePipe],
  templateUrl: './bookmark-detail.component.html',
  styleUrl: './bookmark-detail.component.scss',
})
export class BookmarkDetailComponent implements OnInit {
  bookmark?: Bookmark;

  constructor(
    private route: ActivatedRoute,
    private bookmarksService: BookmarksService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookmarksService.get(id).subscribe((bm) => (this.bookmark = bm));
    }
  }
}
