import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkDetail } from './bookmark-detail.component';

describe('BookmarkDetail', () => {
  let component: BookmarkDetail;
  let fixture: ComponentFixture<BookmarkDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
