import { Schema, model } from 'mongoose';
import { IBorrow } from './borrow.interface';

const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, 'Book ID is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Borrow quantity is required'],
        min: [1, 'Quantity must be at least 1']
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required']
    },
}, {
    versionKey: false,
    timestamps: true
});

export const Borrow = model<IBorrow>('Borrow', borrowSchema);