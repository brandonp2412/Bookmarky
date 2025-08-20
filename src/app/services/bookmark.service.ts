/**
 * @file bookmark.service.ts
 * @description Service for managing bookmarks using localStorage.
 */

import { Injectable } from '@angular/core';
import { Bookmark } from '../models/bookmark.model';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private readonly localStorageKey = 'bookmarks';

  constructor() {
    // Ensure uuid is available. If not, install it.
    // This is a placeholder for the actual uuid import.
    // In a real Angular app, you would `npm install uuid @types/uuid`
    // and then import { v4 as uuidv4 } from 'uuid';
  }

  /**
   * Retrieves all bookmarks from localStorage.
   * @returns An array of Bookmark objects.
   */
  getBookmarks(): Bookmark[] {
    const bookmarksJson = localStorage.getItem(this.localStorageKey);
    return bookmarksJson ? JSON.parse(bookmarksJson) : [];
  }

  /**
   * Adds a new bookmark to localStorage.
   * @param bookmark The bookmark object to add.
   * @returns The added bookmark with a generated ID.
   */
  addBookmark(bookmark: Omit<Bookmark, 'id'>): Bookmark {
    const bookmarks = this.getBookmarks();
    const newBookmark: Bookmark = { ...bookmark, id: uuidv4() };
    bookmarks.push(newBookmark);
    this.saveBookmarks(bookmarks);
    return newBookmark;
  }

  /**
   * Updates an existing bookmark in localStorage.
   * @param updatedBookmark The bookmark object with updated details.
   * @returns The updated bookmark, or undefined if not found.
   */
  updateBookmark(updatedBookmark: Bookmark): Bookmark | undefined {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.findIndex(b => b.id === updatedBookmark.id);
    if (index > -1) {
      bookmarks[index] = updatedBookmark;
      this.saveBookmarks(bookmarks);
      return updatedBookmark;
    }
    return undefined;
  }

  /**
   * Deletes a bookmark from localStorage by its ID.
   * @param id The ID of the bookmark to delete.
   * @returns True if the bookmark was deleted, false otherwise.
   */
  deleteBookmark(id: string): boolean {
    let bookmarks = this.getBookmarks();
    const initialLength = bookmarks.length;
    bookmarks = bookmarks.filter(b => b.id !== id);
    this.saveBookmarks(bookmarks);
    return bookmarks.length < initialLength;
  }

  /**
   * Saves the current array of bookmarks to localStorage.
   * @param bookmarks The array of Bookmark objects to save.
   */
  private saveBookmarks(bookmarks: Bookmark[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(bookmarks));
  }
}
