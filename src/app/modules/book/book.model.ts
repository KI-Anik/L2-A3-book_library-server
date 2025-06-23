import { Schema, model } from 'mongoose';
import { IBook, BookModel } from './book.interface';

const bookSchema = new Schema<IBook, BookModel>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true,
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true
    },
    genre: {
        type: String,
        enum: {
            values: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
            message: '{VALUE} is not a valid genre.'
        },
        uppercase: true,
        required: [true, 'Genre is required'],
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true
    },
    description: {
        type: String
    },
    copies: {
        type: Number,
        required: [true, 'Number of copies is required'],
        min: [0, 'Copies must be a non-negative number']
    },
    available: {
        type: Boolean,
        default: true
    },
}, {
    versionKey: false,
    timestamps: true
});

// Update availability based on copies before saving.
bookSchema.pre('save', function (next) {
    if (this.isModified('copies')) {
        this.available = this.copies > 0;
    }
    next();
});

// Static method to check for book existence by ISBN.
bookSchema.statics.isBookExists = async function (isbn: string) {
    const existingBook = await Book.findOne({ isbn });
    return existingBook;
}

export const Book = model<IBook, BookModel>('Book', bookSchema);



