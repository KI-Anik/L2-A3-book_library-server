
import { Request, Response, NextFunction } from 'express';
import { BorrowService } from './borrow.service';

const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BorrowService.borrowBookInDB(req.body);
    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getBorrowedBooksSummary = async (req: Request, res: Response, next: NextFunction,) => {
  try {
    const result = await BorrowService.getBorrowedBooksSummaryFromDB();
    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BorrowController = {
  borrowBook,
  getBorrowedBooksSummary,
};