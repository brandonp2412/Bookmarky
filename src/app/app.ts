/**
 * @file app.ts
 * @description Root component of the Bookmarky application.
 */

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookmarkOverviewComponent } from './bookmark-overview/bookmark-overview.component';
import { BookmarkResultsComponent } from './bookmark-results/bookmark-results.component';

@Component({
  selector: 'app-root',
  standalone: true, // Mark as standalone
  imports: [RouterOutlet, BookmarkOverviewComponent, BookmarkResultsComponent], // Import components
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bookmarky');
}
