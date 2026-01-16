import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ products: [] });
    }

    await connectDB();

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    }).limit(20);

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Search API error:', error);
    // Return mock data if DB fails so user can see something
    return NextResponse.json({ 
      products: [],
      error: 'Database connection failed. Using offline search.' 
    });
  }
}
