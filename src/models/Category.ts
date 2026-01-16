import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  parentId: mongoose.Types.ObjectId | null;
  level: number;
  image?: string;
  icon?: string;
  description?: string;
  isActive: boolean;
  order: number;
  productCount: number;
  children?: ICategory[];
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  parentId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  level: { type: Number, default: 0 },
  image: { type: String },
  icon: { type: String },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  productCount: { type: Number, default: 0 },
}, { timestamps: true });

CategorySchema.index({ slug: 1 });
CategorySchema.index({ parentId: 1 });
CategorySchema.index({ level: 1, order: 1 });

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
