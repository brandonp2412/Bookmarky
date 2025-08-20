/**
 * @file bookmark-results.ts
 * @description Component for displaying the result of a bookmark submission.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Bookmark } from '../models/bookmark.model';

@Component({
  selector: 'app-bookmark-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmark-results.html',
  styleUrl: './bookmark-results.scss'
})
export class BookmarkResultsComponent implements OnInit {
  submittedBookmark: Bookmark | undefined;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.submittedBookmark = navigation.extras.state['newBookmark'];
    }
  }

  ngOnInit(): void {
    // If no bookmark was submitted (e.g., direct navigation), redirect to overview
    if (!this.submittedBookmark) {
      this.router.navigate(['/overview']);
    }
  }

  /**
   * Navigates back to the bookmark overview page.
   */
  goToOverview(): void {
    this.router.navigate(['/overview']);
  }
}
