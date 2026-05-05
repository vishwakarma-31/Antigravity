import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: [String], required: true },
    sizes: { type: [String], required: true },
    colors: {
      type: [
        {
          name: { type: String },
          hex: { type: String },
        },
      ],
      required: true,
    },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProductSchema.index({ category: 1 });
ProductSchema.index({ name: 'text', description: 'text' });

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);