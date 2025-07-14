import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BookmarksRoutingModule } from './bookmarks-routing.module';

import { BookmarkCreateComponent } from './bookmark-create/bookmark-create.component';
import { BookmarkDetailComponent } from './bookmark-detail/bookmark-detail.component';
import { BookmarkEditComponent } from './bookmark-edit/bookmark-edit.component';
import { BookmarksListComponent } from './bookmarks-list/bookmarks-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BookmarksRoutingModule,
    BookmarksListComponent,
    BookmarkCreateComponent,
    BookmarkEditComponent,
    BookmarkDetailComponent,
  ],
})
export class BookmarksModule {}
