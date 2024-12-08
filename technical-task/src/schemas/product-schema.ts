import { Schema, Document, model } from 'mongoose';
import { User } from './users-schema';
export interface productDocument extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  createdBy: string;
}

export const ProductSchema = new Schema<productDocument>({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  createdBy: { type: String, ref: User },
});

export const Product = model<productDocument>('Product', ProductSchema);
