import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrder extends Document {
  userId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    image: string;
  }[];
  total: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  stripePaymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    items: {
      type: [
        {
          productId: { type: String },
          name: { type: String },
          price: { type: Number },
          quantity: { type: Number },
          size: { type: String },
          color: { type: String },
          image: { type: String },
        },
      ],
      required: true,
    },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: {
      name: { type: String },
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    stripePaymentIntentId: { type: String },
  },
  { timestamps: true }
);

OrderSchema.index({ userId: 1 });
OrderSchema.index({ createdAt: -1 });

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);