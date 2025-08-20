/**
 * @file app.routes.ts
 * @description Defines the application's routing configuration.
 */

import { Routes } from '@angular/router';
import { BookmarkOverviewComponent } from './bookmark-overview/bookmark-overview.component';
import { BookmarkResultsComponent } from './bookmark-results/bookmark-results.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    component: BookmarkOverviewComponent,
    title: 'Bookmark Overview'
  },
  {
    path: 'results',
    component: BookmarkResultsComponent,
    title: 'Bookmark Submission Result'
  },
  {
    path: 'edit/:id',
    component: BookmarkOverviewComponent, // Re-use overview component for editing
    title: 'Edit Bookmark'
  },
  {
    path: '**',
    redirectTo: 'overview'
  }
];
