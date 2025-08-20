# Technical Design Document (TDD) - Bookmarky Application

## 1. Introduction
This document outlines the technical design for the Bookmarky web application, a front-end only solution for managing a list of bookmarks. Users can add, edit, and delete links, with data persistence handled via browser's Local Storage. The application features an overview page with a submission form and a paginated list of bookmarks, and a results page for new submissions.

## 2. Architecture
The application is built using Angular, following a component-based architecture.
- **Components**: `BookmarkOverviewComponent` and `BookmarkResultsComponent` handle the UI and user interactions for their respective views.
- **Services**: `BookmarkService` encapsulates the business logic for managing bookmarks, including CRUD operations and data persistence.
- **Models**: `Bookmark` interface defines the structure of a bookmark object.

## 3. Data Flow
1. **Data Persistence**: Bookmarks are stored in the browser's `localStorage` to ensure persistence across page reloads. The `BookmarkService` is responsible for reading from and writing to `localStorage`.
2. **Adding/Editing Bookmarks**:
   - The `BookmarkOverviewComponent` contains a reactive form for submitting new bookmarks or editing existing ones.
   - Upon submission, the component validates the input (URL format and existence).
   - Validated data is passed to the `BookmarkService` for storage.
   - After adding, the user is redirected to the `BookmarkResultsComponent` to see their submission.
   - For editing, the form is pre-filled with existing bookmark data, and upon update, the user is redirected back to the overview.
3. **Displaying Bookmarks**:
   - The `BookmarkOverviewComponent` retrieves all bookmarks from `BookmarkService`.
   - It implements client-side pagination to display 20 links per page, with navigation controls.
4. **Deleting Bookmarks**:
   - The `BookmarkOverviewComponent` allows users to delete bookmarks, which triggers a call to the `BookmarkService`.

## 4. Components
### 4.1. `BookmarkOverviewComponent`
- **Purpose**: Displays the bookmark submission form and the list of bookmarks.
- **Dependencies**: `FormBuilder`, `BookmarkService`, `Router`, `ActivatedRoute`.
- **Key Features**:
    - Reactive form for URL and Title input.
    - Custom URL validation (format and existence check using `fetch` with `HEAD` request and `no-cors` mode).
    - Displays a paginated list of bookmarks (20 per page).
    - Provides "Edit" and "Delete" actions for each bookmark.
    - Handles navigation to the results page or edit mode.
    - Manages pagination state (`currentPage`, `itemsPerPage`, `totalPages`).

### 4.2. `BookmarkResultsComponent`
- **Purpose**: Displays details of a newly submitted bookmark.
- **Dependencies**: `Router`.
- **Key Features**:
    - Receives submitted bookmark data via `Router` state.
    - Displays the title and URL of the submitted bookmark.
    - Provides a link/button to navigate back to the overview page.

## 5. Services
### 5.1. `BookmarkService`
- **Purpose**: Manages bookmark data, abstracting `localStorage` interactions.
- **Dependencies**: `uuid` for unique ID generation.
- **Key Methods**:
    - `getBookmarks()`: Retrieves all bookmarks.
    - `addBookmark(bookmark: Omit<Bookmark, 'id'>)`: Adds a new bookmark with a unique ID.
    - `updateBookmark(updatedBookmark: Bookmark)`: Updates an existing bookmark.
    - `deleteBookmark(id: string)`: Deletes a bookmark by ID.
    - `saveBookmarks(bookmarks: Bookmark[])`: Private helper to save data to `localStorage`.

## 6. Models
### 6.1. `Bookmark` Interface
- **Purpose**: Defines the structure for a bookmark object.
- **Properties**:
    - `id: string`: Unique identifier for the bookmark.
    - `url: string`: The URL of the bookmark.
    - `title: string`: The title/description of the bookmark.

## 7. Routing
- `/`: Redirects to `/overview`.
- `/overview`: Renders `BookmarkOverviewComponent`.
- `/results`: Renders `BookmarkResultsComponent`, expecting `newBookmark` in router state.
- `/edit/:id`: Renders `BookmarkOverviewComponent`, using the `id` parameter to pre-fill the form for editing.
- `**`: Wildcard route, redirects to `/overview`.

## 8. Styling
- Global styles are defined in `src/styles.scss`.
- Component-specific styles are defined in their respective `.scss` files (e.g., `bookmark-overview.scss`).
- Basic responsive design principles are applied for better usability on different screen sizes.

## 9. Limitations
- **No Backend**: As per requirements, there is no backend database. All data is stored in `localStorage`, which has limitations:
    - **Storage Limit**: `localStorage` has a limited storage capacity (typically 5-10 MB per origin).
    - **Security**: Data is accessible via client-side JavaScript and is not encrypted. Not suitable for sensitive information.
    - **Scalability**: Not suitable for large datasets or multi-user scenarios.
    - **Data Sync**: Data is not synchronized across different browsers or devices.
- **URL Existence Validation**: The `fetch` with `HEAD` and `no-cors` mode is a best-effort attempt to check URL existence without triggering CORS issues. It only indicates if a request could be initiated, not necessarily if the resource is valid or returns a 200 OK status. Some URLs might block `HEAD` requests or `no-cors` mode might not be sufficient for all scenarios.
- **Error Handling**: Basic error handling is implemented for form validation and URL existence. More robust error handling (e.g., user-friendly modals for network errors, specific error messages for different HTTP statuses) could be added.
- **Testing**: Unit and integration tests are not included in this initial deliverable but would be crucial for a production-ready application.

## 10. Future Enhancements
- **Search/Filter**: Add functionality to search or filter bookmarks by title or URL.
- **Sorting**: Allow sorting bookmarks by title, URL, or date added.
- **Categories/Tags**: Implement a system for categorizing or tagging bookmarks.
- **User Authentication**: For multi-user scenarios, integrate a backend with user authentication.
- **Improved URL Validation**: Explore more robust server-side URL validation if a backend is introduced.
- **Accessibility (A11y)**: Enhance accessibility features for users with disabilities.
- **Animations**: Add subtle animations for a more dynamic user experience.
- **Unit/Integration Tests**: Implement comprehensive test suites.
