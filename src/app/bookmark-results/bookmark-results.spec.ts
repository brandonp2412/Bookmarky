import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkResults } from './bookmark-results';

describe('BookmarkResults', () => {
  let component: BookmarkResults;
  let fixture: ComponentFixture<BookmarkResults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkResults]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkResults);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
