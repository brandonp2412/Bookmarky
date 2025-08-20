import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BookmarkOverviewComponent } from './bookmark-overview.component';

describe('BookmarkOverviewComponent', () => {
  let component: BookmarkOverviewComponent;
  let fixture: ComponentFixture<BookmarkOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkOverviewComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => '123' }) // Mock a paramMap with an ID
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
