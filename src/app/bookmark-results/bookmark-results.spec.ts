import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkResultsComponent } from './bookmark-results.component';

describe('BookmarkResultsComponent', () => {
  let component: BookmarkResultsComponent;
  let fixture: ComponentFixture<BookmarkResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
