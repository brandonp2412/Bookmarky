import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkOverview } from './bookmark-overview';

describe('BookmarkOverview', () => {
  let component: BookmarkOverview;
  let fixture: ComponentFixture<BookmarkOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
