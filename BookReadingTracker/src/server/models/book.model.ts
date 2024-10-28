import mongoose, { Schema, Document } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  pages: number;
  pagesRead: number;
  format: string;
  suggestedBy: string;
  finished: boolean;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, required: true },
  pagesRead: { type: Number, required: true },
  format: { type: String, required: true },
  suggestedBy: { type: String, required: true },
  finished: { type: Boolean, default: false },
});

export default mongoose.model<IBook>('Book', BookSchema);
