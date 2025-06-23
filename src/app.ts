import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { BookRoutes } from './app/modules/book/book.route';
import { BorrowRoutes } from './app/modules/borrow/borrow.route';

const app: Application = express();

// Application level middleware
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/books', BookRoutes);
app.use('/api/borrow', BorrowRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Library Management System API!"
  });
});

// Global error handler for centralized error processing.
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = err.message || 'An unexpected error occurred!';
    let errorObject = err;

    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation failed';
        // Construct a cleaner error object from the Mongoose error
        errorObject = {
            name: err.name,
            errors: err.errors,
        };
    } 
    else if (err.code && err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `Duplicate key error: A book with this ${field} already exists.`;
        errorObject = { name: "DuplicateKeyError", keyValue: err.keyValue };
    } 
    else if (err instanceof Error) {
        errorObject = { name: err.name, message: err.message };
    }

    res.status(statusCode).json({
        success: false,
        message,
        error: errorObject,
    });
});

// Handles requests to non-existent routes.
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'API Not Found',
    error: {
      name: 'NotFoundError',
      message: `The requested path '${req.originalUrl}' does not exist.`
    }
  });
});

export default app;
