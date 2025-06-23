import { IBook } from './book.interface';
import { Book } from './book.model';

const createBookIntoDB = async (payload: IBook) => {
    console.log(payload, 'service');
    if (await Book.isBookExists(payload.isbn)) {
        throw new Error(`A book with ISBN ${payload.isbn} already exists.`);
    }

    const result = await Book.create(payload);
    return result;
};

const getAllBooksFromDB = async (query: Record<string, unknown>) => {
    const { filter, sortBy, sort, limit = 10 } = query;

    const filterQuery: Record<string, unknown> = {};
    if (filter) {
        filterQuery.genre = filter;
    }

    const sortQuery: Record<string, 1 | -1> = {};
    if (sortBy) {
        sortQuery[sortBy as string] = sort === 'desc' ? -1 : 1;
    }

    const result = await Book.find(filterQuery)
        .sort(sortQuery)
        .limit(Number(limit));
    return result;
};

const getBookByIdFromDB = async (id: string) => {
    const result = await Book.findById(id);
    return result;
};

const updateBookInDB = async (id: string, payload: Partial<IBook>) => {
    const result = await Book.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return result;
};

const deleteBookFromDB = async (id: string) => {
    const result = await Book.findByIdAndDelete(id);
    return result;
};

export const BookService = {
    createBookIntoDB,
    getAllBooksFromDB,
    getBookByIdFromDB,
    updateBookInDB,
    deleteBookFromDB
};