/**
 * @file bookmark-overview.ts
 * @description Component for displaying the bookmark overview, including a form for adding/editing and a list of bookmarks with pagination.
 */

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookmarkService } from '../services/bookmark.service';
import { Bookmark } from '../models/bookmark.model';

@Component({
  selector: 'app-bookmark-overview',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bookmark-overview.html',
  styleUrl: './bookmark-overview.scss'
})
export class BookmarkOverviewComponent implements OnInit {
  private fb = inject(FormBuilder);
  private bookmarkService = inject(BookmarkService);
  router = inject(Router);
  private route = inject(ActivatedRoute);

  bookmarkForm: FormGroup;
  bookmarks: Bookmark[] = [];
  currentPage = 1;
  itemsPerPage = 20;
  totalPages = 0;
  paginatedBookmarks: Bookmark[] = [];
  editingBookmarkId: string | null = null;

  constructor() {
    this.bookmarkForm = this.fb.group({
      url: ['', [Validators.required, this.urlValidator]],
      title: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBookmarks();
    this.route.paramMap.subscribe(params => {
      this.editingBookmarkId = params.get('id');
      if (this.editingBookmarkId) {
        this.loadBookmarkForEdit(this.editingBookmarkId);
      }
    });
  }

  /**
   * Custom URL validator to check for a valid URL format.
   * @param control The form control for the URL.
   * @returns Validation errors or null if valid.
   */
  urlValidator(control: FormControl): Record<string, unknown> | null {
    if (!control.value) {
      return null; // Don't validate empty values, Validators.required handles it
    }
    try {
      new URL(control.value);
      return null;
    } catch (e) { 
      console.error(e);
      return { 'invalidUrl': true };
    }
  }

  /**
   * Loads all bookmarks from the service and updates pagination.
   */
  loadBookmarks(): void {
    this.bookmarks = this.bookmarkService.getBookmarks();
    this.updatePagination();
  }

  /**
   * Loads a specific bookmark for editing if an ID is present in the route.
   * @param id The ID of the bookmark to edit.
   */
  loadBookmarkForEdit(id: string): void {
    const bookmarkToEdit = this.bookmarks.find(b => b.id === id);
    if (bookmarkToEdit) {
      this.bookmarkForm.patchValue(bookmarkToEdit);
    } else {
      // If bookmark not found, navigate back to overview
      this.router.navigate(['/overview']);
    }
  }

  /**
   * Handles form submission for adding or updating a bookmark.
   * Validates URL existence before saving.
   */
  async onSubmit(): Promise<void> {
    if (this.bookmarkForm.invalid) {
      this.bookmarkForm.markAllAsTouched();
      return;
    }

    const { url, title } = this.bookmarkForm.value;

    // Validate URL existence
    const urlExists = await this.checkUrlExistence(url);
    if (!urlExists) {
      this.bookmarkForm.controls['url'].setErrors({ 'urlNotFound': true });
      return;
    }

    if (this.editingBookmarkId) {
      // Update existing bookmark
      const updatedBookmark: Bookmark = { id: this.editingBookmarkId, url, title };
      this.bookmarkService.updateBookmark(updatedBookmark);
      this.editingBookmarkId = null; // Clear editing state
      this.router.navigate(['/overview']); // Go back to overview after edit
    } else {
      // Add new bookmark
      const newBookmark = this.bookmarkService.addBookmark({ url, title });
      this.router.navigate(['/results'], { state: { newBookmark } });
    }
    this.bookmarkForm.reset();
    this.loadBookmarks(); // Reload bookmarks to update the list
  }

  /**
   * Checks if a given URL exists by attempting to fetch it.
   * @param url The URL to check.
   * @returns A promise that resolves to true if the URL exists, false otherwise.
   */
  private async checkUrlExistence(url: string): Promise<boolean> {
    try {
      // Using fetch with 'no-cors' mode to avoid CORS issues for existence check
      // This will not allow reading the response, but will tell us if the request was made.
      await fetch(url, { method: 'HEAD', mode: 'no-cors' });
      // For 'no-cors' mode, response.ok will always be false, but a successful fetch
      // means the URL was reachable. A network error would throw.
      return true;
    } catch (error) {
      console.error('URL existence check failed:', error);
      return false;
    }
  }

  /**
   * Deletes a bookmark by its ID.
   * @param id The ID of the bookmark to delete.
   */
  deleteBookmark(id: string): void {
    if (confirm('Are you sure you want to delete this bookmark?')) {
      this.bookmarkService.deleteBookmark(id);
      this.loadBookmarks();
    }
  }

  /**
   * Navigates to the edit page for a specific bookmark.
   * @param id The ID of the bookmark to edit.
   */
  editBookmark(id: string): void {
    this.router.navigate(['/edit', id]);
  }

  /**
   * Updates pagination details and slices bookmarks for the current page.
   */
  updatePagination(): void {
    this.totalPages = Math.ceil(this.bookmarks.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBookmarks = this.bookmarks.slice(startIndex, endIndex);
  }

  /**
   * Changes the current page.
   * @param page The page number to navigate to.
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  /**
   * Generates an array of page numbers for pagination display.
   * @returns An array of page numbers.
   */
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
