import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get('parentId');
    const tree = searchParams.get('tree') === 'true';

    if (tree) {
      const allCategories = await Category.find({ isActive: true }).sort({ order: 1 }).lean();
      
      const buildTree = (parentId: string | null): any[] => {
        return allCategories
          .filter(c => String(c.parentId || '') === String(parentId || ''))
          .map(c => ({
            ...c,
            _id: c._id.toString(),
            children: buildTree(c._id.toString()),
          }));
      };

      return NextResponse.json({
        success: true,
        categories: buildTree(null),
      });
    }

    const query: any = { isActive: true };
    if (parentId === 'null' || parentId === '') {
      query.parentId = null;
    } else if (parentId) {
      query.parentId = parentId;
    }

    const categories = await Category.find(query).sort({ order: 1 }).lean();

    return NextResponse.json({
      success: true,
      categories: categories.map(c => ({ ...c, _id: c._id.toString() })),
    });
  } catch (error: any) {
    console.error('Categories error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    const category = await Category.create({
      ...body,
      slug,
    });

    return NextResponse.json({
      success: true,
      category,
    });
  } catch (error: any) {
    console.error('Create category error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
