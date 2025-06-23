import { Borrow } from './borrow.model';
import { Book } from '../book/book.model';
import mongoose from 'mongoose';
import { IBorrow } from './borrow.interface';

const borrowBookInDB = async (payload: IBorrow) => {
  // Use a MongoDB transaction to ensure data consistency.
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { book: bookId, quantity } = payload;
    
    const book = await Book.findById(bookId).session(session);
    if (!book) throw new Error('Book not found.');
    if (book.copies < quantity) throw new Error('Insufficient copies available.');

    // subtraction from stored copies
    book.copies -= quantity;
    await book.save({ session });
    
    const result = await Borrow.create([payload], { session });
    
    await session.commitTransaction();
    return result[0];

  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getBorrowedBooksSummaryFromDB = async () => {
  // Aggregation pipeline to generate a summary of borrowed books.
  const result = await Borrow.aggregate([
    { $group: { _id: '$book', totalQuantity: { $sum: '$quantity' } } },
    { $lookup: { from: 'books', localField: '_id', foreignField: '_id', as: 'bookDetails' } },
    { $unwind: '$bookDetails' },
    {
      $project: {
        _id: 0,
        book: { title: '$bookDetails.title', isbn: '$bookDetails.isbn' },
        totalQuantity: 1,
      },
    },
  ]);
  return result;
};

export const BorrowService = {
  borrowBookInDB,
  getBorrowedBooksSummaryFromDB,
};