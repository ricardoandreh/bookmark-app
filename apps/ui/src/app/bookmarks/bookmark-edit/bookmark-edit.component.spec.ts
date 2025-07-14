import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkEdit } from './bookmark-edit.component';

describe('BookmarkEdit', () => {
  let component: BookmarkEdit;
  let fixture: ComponentFixture<BookmarkEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
