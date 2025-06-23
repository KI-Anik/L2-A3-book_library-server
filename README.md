# Library Management System API

A RESTful API for a Library Management System built with Node.js, Express, TypeScript, and MongoDB.

## Key Features

-   Full CRUD functionality for books.
-   Borrowing system with availability checks and transactional integrity.
-   Dynamic filtering and sorting for book collections.
-   Aggregation pipeline for summarizing borrowed books.
-   Centralized error handling for consistent API responses.
-   Built with a clean `controller -> service -> model` architecture.

---

## Getting Started

### Prerequisites

-   Node.js (v14+)
-   npm or yarn
-   MongoDB

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url> && cd L2-A3-book_library-server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment:**
    Create a `.env` file in the root directory:

### Running the Application

-   **Development:** `npm run dev`
-   **Production:** `npm run build && npm start`

The API will be available at `http://localhost:4000`.

---

## API Endpoints

All endpoints are prefixed with `/api`.

### Book Management (`/books`)

-   `POST /`: Create a new book.
-   `GET /`: Get all books (with filtering/sorting).
-   `GET /:bookId`: Get a single book.
-   `PUT /:bookId`: Update a book.
-   `DELETE /:bookId`: Delete a book.

### Borrow Management (`/borrow`)

-   `POST /`: Borrow a book.
-   `GET /`: Get a summary of all borrowed books.

---

### Error Handling

The API provides standardized JSON error responses. For validation errors, a detailed object is returned, as specified in the project requirements.


