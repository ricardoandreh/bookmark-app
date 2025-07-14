import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksListComponent } from './bookmarks-list/bookmarks-list.component';
import { BookmarkCreateComponent } from './bookmark-create/bookmark-create.component';
import { BookmarkEditComponent } from './bookmark-edit/bookmark-edit.component';
import { BookmarkDetailComponent } from './bookmark-detail/bookmark-detail.component';

const routes: Routes = [
  { path: '', component: BookmarksListComponent },
  { path: 'create', component: BookmarkCreateComponent },
  { path: ':id/edit', component: BookmarkEditComponent },
  { path: ':id', component: BookmarkDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookmarksRoutingModule {}
