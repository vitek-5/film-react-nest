import mongoose, { Schema, Model, Document } from 'mongoose';

export interface Schedule {
  id: string;
  daytime: Date;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface FilmDocument extends Document {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: Schedule[];
}

const ScheduleSchema = new Schema<Schedule>(
  {
    id: { type: String, required: true },
    daytime: { type: Date, required: true },
    hall: { type: Number, required: true, min: 0 },
    rows: { type: Number, required: true, min: 1 },
    seats: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    taken: { type: [String], default: [] },
  },
  { _id: false },
);

const FilmSchema = new Schema<FilmDocument>({
  id: { type: String, required: true, unique: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  director: { type: String, required: true },
  tags: { type: [String], required: true },
  image: { type: String, required: true },
  cover: { type: String, required: true },
  title: { type: String, required: true },
  about: { type: String, required: true },
  description: { type: String, required: true },
  schedule: { type: [ScheduleSchema], required: true },
});

export const Film: Model<FilmDocument> = mongoose.model<FilmDocument>(
  'Film',
  FilmSchema,
);
