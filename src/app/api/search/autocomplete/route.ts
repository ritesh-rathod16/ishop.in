import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

const popularSearches = [
  'smart watch', 'headphones', 'mobile phone', 'laptop', 'earbuds',
  'tablet', 'camera', 'speaker', 'keyboard', 'mouse', 'monitor',
  'shoes', 'shirt', 'jeans', 'watch', 'book', 'air fryer', 'mixer grinder'
];

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  if (q.length >= 3 && levenshteinDistance(q, t.slice(0, q.length + 2)) <= 2) return true;
  return false;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim() || '';
    const category = searchParams.get('category') || '';
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 15);

    if (!query || query.length < 1) {
      return NextResponse.json({
        success: true,
        suggestions: [],
        trending: popularSearches.slice(0, 6),
      });
    }

    const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    const suggestions: { type: string; text: string; image?: string; price?: number; id?: string; category?: string }[] = [];

    const categoryQuery: any = { isActive: true };
    if (category) {
      categoryQuery.slug = category;
    }
    const matchingCategories = await Category.find({
      name: { $regex: normalizedQuery, $options: 'i' },
      isActive: true,
    }).limit(3).lean();

    matchingCategories.forEach(cat => {
      suggestions.push({
        type: 'category',
        text: cat.name,
        category: cat.slug,
        image: cat.image,
      });
    });

    const productQuery: any = {
      isActive: true,
      $or: [
        { name: { $regex: normalizedQuery, $options: 'i' } },
        { brand: { $regex: normalizedQuery, $options: 'i' } },
        { category: { $regex: normalizedQuery, $options: 'i' } },
      ],
    };

    const products = await Product.find(productQuery)
      .select('name image price category brand')
      .sort({ reviews: -1, rating: -1 })
      .limit(8)
      .lean();

    const seenTexts = new Set<string>();
    
    products.forEach(product => {
      const words = product.name.toLowerCase().split(' ');
      const matchIdx = words.findIndex((w: string) => w.startsWith(normalizedQuery));
      
      if (matchIdx >= 0) {
        const phrase = words.slice(Math.max(0, matchIdx - 1), matchIdx + 3).join(' ');
        const key = phrase.toLowerCase();
        if (!seenTexts.has(key)) {
          seenTexts.add(key);
          suggestions.push({
            type: 'suggestion',
            text: phrase,
            category: product.category,
          });
        }
      }

      suggestions.push({
        type: 'product',
        text: product.name,
        image: product.image,
        price: product.price,
        id: product._id.toString(),
        category: product.category,
      });
    });

    const matchingPopular = popularSearches.filter(s => 
      s.toLowerCase().includes(normalizedQuery) || fuzzyMatch(normalizedQuery, s)
    );
    
    matchingPopular.forEach(text => {
      if (!seenTexts.has(text.toLowerCase())) {
        seenTexts.add(text.toLowerCase());
        suggestions.push({ type: 'popular', text });
      }
    });

    const rankedSuggestions = suggestions.sort((a, b) => {
      const typeOrder: Record<string, number> = { category: 0, suggestion: 1, popular: 2, product: 3 };
      return (typeOrder[a.type] || 5) - (typeOrder[b.type] || 5);
    });

    return NextResponse.json({
      success: true,
      query,
      suggestions: rankedSuggestions.slice(0, limit),
    });
  } catch (error: any) {
    console.error('Autocomplete error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
