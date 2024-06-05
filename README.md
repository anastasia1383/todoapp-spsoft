# TODO Application

## Summary

This TODO application is built using React, Redux, and TypeScript. A simple TODO list manager that includes user authentication, permission-based editing, and item management. 

- [DEMO](https://anastasia1383.github.io/todoapp-spsoft)

### Fake API and Local Storage Usage

- **Fake API**: The application utilizes JSONPlaceholder (https://jsonplaceholder.typicode.com/) as a mock server to simulate backend interactions such as user authentication and permission checks.
  
- **Local Storage**: Adding, editing, and deleting TODO items are implemented using local storage. User authentication details and TODO items are stored locally during a session. However, changes made during the session won't persist after logging out.

This setup ensures a smooth user experience within a single session while maintaining data integrity and security.

## Mocked data

- User with permissions: Sincere@april.biz
- User without permissions: Shanna@melissa.tv

## Features

1. **User Authentication**
   - Simulates user login.
   - Redirects to TODO list page on success or unauthorized page on failure.

2. **TODO List Management**
   - Users can check/uncheck items.
   - Checked items move to the bottom, unchecked items move to the top above checked items.

3. **Edit Mode**
   - 'Edit' toggle button for entering edit mode.
   - Simulates server call to check permissions.
   - If permitted, users can add new items, and edit items and remove existing items.
   - Removed items are grayed out and visible only in edit mode.

## Technologies Used

### Frontend:
- React: 18.2.0
- React DOM: 18.2.0
- React Router DOM: 6.23.1
- Redux Toolkit: 2.2.5
- React Redux: 9.1.2
- React Hook Form: 7.51.5

### State Management:
- Redux Persist: 6.0.0

### Build Tools:
- Vite: 5.2.0
- TypeScript: 5.2.2
- ESLint: 8.57.0
- TailwindCSS: 3.4.3
