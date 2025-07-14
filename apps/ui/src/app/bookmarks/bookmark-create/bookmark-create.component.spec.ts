import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkCreate } from './bookmark-create.component';

describe('BookmarkCreate', () => {
  let component: BookmarkCreate;
  let fixture: ComponentFixture<BookmarkCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
