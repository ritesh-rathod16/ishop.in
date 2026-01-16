import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISearchHistory extends Document {
  userId?: string;
  sessionId: string;
  query: string;
  resultCount: number;
  clickedProductId?: string;
  timestamp: Date;
}

const SearchHistorySchema = new Schema<ISearchHistory>({
  userId: { type: String },
  sessionId: { type: String, required: true },
  query: { type: String, required: true },
  resultCount: { type: Number, default: 0 },
  clickedProductId: { type: String },
  timestamp: { type: Date, default: Date.now },
});

SearchHistorySchema.index({ query: 1 });
SearchHistorySchema.index({ userId: 1 });
SearchHistorySchema.index({ timestamp: -1 });

const SearchHistory: Model<ISearchHistory> = mongoose.models.SearchHistory || mongoose.model<ISearchHistory>('SearchHistory', SearchHistorySchema);

export default SearchHistory;
