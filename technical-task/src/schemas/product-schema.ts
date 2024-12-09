import { Schema, Document, model, Types } from 'mongoose';
import { UserDocument } from './users-schema';
export interface productDocument extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  createdBy: UserDocument;
}

export const ProductSchema = new Schema<productDocument>({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Product = model<productDocument>('Product', ProductSchema);
