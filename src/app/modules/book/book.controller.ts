import { Request, Response, NextFunction } from 'express';
import { BookService } from './book.service';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BookService.createBookIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BookService.getAllBooksFromDB(req.query);
    
    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BookService.getBookByIdFromDB(req.params.bookId);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BookService.updateBookInDB(req.params.bookId, req.body);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BookService.deleteBookFromDB(req.params.bookId);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
