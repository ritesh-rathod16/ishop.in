import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();

    const [
      deals,
      mobiles,
      fashion,
      books,
      homeKitchen,
      computers,
      gaming,
      sponsored
    ] = await Promise.all([
      Product.find({ subcategory: 'Deals', isActive: true }).limit(8).lean(),
      Product.find({ subcategory: 'Mobiles', isActive: true }).limit(8).lean(),
      Product.find({ category: 'Fashion', isActive: true }).limit(8).lean(),
      Product.find({ category: 'Books', isActive: true }).limit(6).lean(),
      Product.find({ category: 'Home & Kitchen', isActive: true }).limit(8).lean(),
      Product.find({ category: 'Computers', isActive: true }).limit(6).lean(),
      Product.find({ category: 'Gaming', isActive: true }).limit(6).lean(),
      Product.find({ subcategory: 'Mobiles', isActive: true }).skip(8).limit(6).lean(),
    ]);

    const formatProducts = (products: any[]) => products.map(p => ({
      id: p._id.toString(),
      image: p.image,
      title: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      discount: p.discount,
      rating: p.rating,
      reviews: p.reviews,
      prime: p.stock > 0,
      badge: p.badge || (p.discount >= 50 ? `${p.discount}% off` : undefined),
    }));

    return NextResponse.json({
      success: true,
      data: {
        todaysDeals: formatProducts(deals),
        mobilePhones: formatProducts(mobiles),
        fashionProducts: formatProducts(fashion),
        bestsellers: formatProducts(books),
        homeKitchen: formatProducts(homeKitchen),
        computers: formatProducts(computers),
        gaming: formatProducts(gaming),
        sponsoredProducts: formatProducts(sponsored),
      }
    });
  } catch (error: unknown) {
    console.error('Homepage products error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch homepage products';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
