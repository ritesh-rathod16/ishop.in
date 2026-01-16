import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

const categoriesData = [
  {
    name: 'Electronics',
    slug: 'electronics',
    icon: '📱',
    order: 1,
    children: [
      { name: 'Mobiles & Accessories', slug: 'mobiles', children: [
        { name: 'Smartphones', slug: 'smartphones' },
        { name: 'Feature Phones', slug: 'feature-phones' },
        { name: 'Mobile Cases', slug: 'mobile-cases' },
        { name: 'Screen Protectors', slug: 'screen-protectors' },
        { name: 'Power Banks', slug: 'power-banks' },
        { name: 'Mobile Chargers', slug: 'mobile-chargers' },
      ]},
      { name: 'Laptops & Computers', slug: 'computers', children: [
        { name: 'Laptops', slug: 'laptops' },
        { name: 'Gaming Laptops', slug: 'gaming-laptops' },
        { name: 'Desktop PCs', slug: 'desktops' },
        { name: 'Monitors', slug: 'monitors' },
        { name: 'Printers', slug: 'printers' },
        { name: 'Computer Accessories', slug: 'computer-accessories' },
      ]},
      { name: 'TV & Home Entertainment', slug: 'tv-home-entertainment', children: [
        { name: 'Televisions', slug: 'televisions' },
        { name: 'Home Theatre', slug: 'home-theatre' },
        { name: 'Streaming Devices', slug: 'streaming-devices' },
        { name: 'Projectors', slug: 'projectors' },
      ]},
      { name: 'Audio', slug: 'audio', children: [
        { name: 'Headphones', slug: 'headphones' },
        { name: 'Earbuds', slug: 'earbuds' },
        { name: 'Bluetooth Speakers', slug: 'bluetooth-speakers' },
        { name: 'Soundbars', slug: 'soundbars' },
      ]},
      { name: 'Cameras', slug: 'cameras', children: [
        { name: 'DSLR Cameras', slug: 'dslr-cameras' },
        { name: 'Mirrorless Cameras', slug: 'mirrorless' },
        { name: 'Action Cameras', slug: 'action-cameras' },
        { name: 'Camera Accessories', slug: 'camera-accessories' },
      ]},
      { name: 'Wearables', slug: 'wearables', children: [
        { name: 'Smart Watches', slug: 'smart-watches' },
        { name: 'Fitness Bands', slug: 'fitness-bands' },
        { name: 'Smart Glasses', slug: 'smart-glasses' },
      ]},
    ],
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    icon: '👕',
    order: 2,
    children: [
      { name: "Men's Fashion", slug: 'mens-fashion', children: [
        { name: 'T-Shirts', slug: 'mens-tshirts' },
        { name: 'Shirts', slug: 'mens-shirts' },
        { name: 'Jeans', slug: 'mens-jeans' },
        { name: 'Trousers', slug: 'mens-trousers' },
        { name: 'Ethnic Wear', slug: 'mens-ethnic' },
        { name: 'Winter Wear', slug: 'mens-winter' },
      ]},
      { name: "Women's Fashion", slug: 'womens-fashion', children: [
        { name: 'Dresses', slug: 'womens-dresses' },
        { name: 'Tops', slug: 'womens-tops' },
        { name: 'Sarees', slug: 'sarees' },
        { name: 'Kurtis', slug: 'kurtis' },
        { name: 'Lehengas', slug: 'lehengas' },
        { name: 'Western Wear', slug: 'womens-western' },
      ]},
      { name: 'Footwear', slug: 'footwear', children: [
        { name: 'Sports Shoes', slug: 'sports-shoes' },
        { name: 'Casual Shoes', slug: 'casual-shoes' },
        { name: 'Formal Shoes', slug: 'formal-shoes' },
        { name: 'Sandals', slug: 'sandals' },
        { name: 'Heels', slug: 'heels' },
      ]},
      { name: 'Watches', slug: 'watches', children: [
        { name: 'Analog Watches', slug: 'analog-watches' },
        { name: 'Digital Watches', slug: 'digital-watches' },
        { name: 'Luxury Watches', slug: 'luxury-watches' },
      ]},
      { name: 'Bags & Luggage', slug: 'bags-luggage', children: [
        { name: 'Backpacks', slug: 'backpacks' },
        { name: 'Handbags', slug: 'handbags' },
        { name: 'Trolley Bags', slug: 'trolley-bags' },
        { name: 'Wallets', slug: 'wallets' },
      ]},
      { name: 'Jewellery', slug: 'jewellery', children: [
        { name: 'Gold Jewellery', slug: 'gold-jewellery' },
        { name: 'Silver Jewellery', slug: 'silver-jewellery' },
        { name: 'Fashion Jewellery', slug: 'fashion-jewellery' },
      ]},
    ],
  },
  {
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    icon: '🏠',
    order: 3,
    children: [
      { name: 'Kitchen & Dining', slug: 'kitchen-dining', children: [
        { name: 'Cookware', slug: 'cookware' },
        { name: 'Kitchen Tools', slug: 'kitchen-tools' },
        { name: 'Dinnerware', slug: 'dinnerware' },
        { name: 'Storage Containers', slug: 'storage-containers' },
      ]},
      { name: 'Home Appliances', slug: 'home-appliances', children: [
        { name: 'Mixer Grinders', slug: 'mixer-grinders' },
        { name: 'Air Fryers', slug: 'air-fryers' },
        { name: 'Microwave Ovens', slug: 'microwave-ovens' },
        { name: 'Water Purifiers', slug: 'water-purifiers' },
        { name: 'Vacuum Cleaners', slug: 'vacuum-cleaners' },
      ]},
      { name: 'Furniture', slug: 'furniture', children: [
        { name: 'Beds', slug: 'beds' },
        { name: 'Sofas', slug: 'sofas' },
        { name: 'Tables', slug: 'tables' },
        { name: 'Chairs', slug: 'chairs' },
        { name: 'Wardrobes', slug: 'wardrobes' },
      ]},
      { name: 'Home Decor', slug: 'home-decor', children: [
        { name: 'Wall Art', slug: 'wall-art' },
        { name: 'Clocks', slug: 'clocks' },
        { name: 'Lighting', slug: 'lighting' },
        { name: 'Rugs & Carpets', slug: 'rugs-carpets' },
      ]},
      { name: 'Bedding', slug: 'bedding', children: [
        { name: 'Bedsheets', slug: 'bedsheets' },
        { name: 'Pillows', slug: 'pillows' },
        { name: 'Blankets', slug: 'blankets' },
        { name: 'Mattresses', slug: 'mattresses' },
      ]},
    ],
  },
  {
    name: 'Appliances',
    slug: 'appliances',
    icon: '🔌',
    order: 4,
    children: [
      { name: 'Large Appliances', slug: 'large-appliances', children: [
        { name: 'Refrigerators', slug: 'refrigerators' },
        { name: 'Washing Machines', slug: 'washing-machines' },
        { name: 'Air Conditioners', slug: 'air-conditioners' },
        { name: 'Dishwashers', slug: 'dishwashers' },
      ]},
      { name: 'Small Appliances', slug: 'small-appliances', children: [
        { name: 'Iron', slug: 'iron' },
        { name: 'Fans', slug: 'fans' },
        { name: 'Heaters', slug: 'heaters' },
        { name: 'Air Purifiers', slug: 'air-purifiers' },
      ]},
    ],
  },
  {
    name: 'Beauty & Health',
    slug: 'beauty-health',
    icon: '💄',
    order: 5,
    children: [
      { name: 'Makeup', slug: 'makeup', children: [
        { name: 'Lipstick', slug: 'lipstick' },
        { name: 'Foundation', slug: 'foundation' },
        { name: 'Mascara', slug: 'mascara' },
        { name: 'Nail Polish', slug: 'nail-polish' },
      ]},
      { name: 'Skincare', slug: 'skincare', children: [
        { name: 'Face Wash', slug: 'face-wash' },
        { name: 'Moisturizers', slug: 'moisturizers' },
        { name: 'Sunscreen', slug: 'sunscreen' },
        { name: 'Serums', slug: 'serums' },
      ]},
      { name: 'Hair Care', slug: 'hair-care', children: [
        { name: 'Shampoo', slug: 'shampoo' },
        { name: 'Conditioner', slug: 'conditioner' },
        { name: 'Hair Oil', slug: 'hair-oil' },
        { name: 'Hair Dryers', slug: 'hair-dryers' },
      ]},
      { name: 'Personal Care', slug: 'personal-care', children: [
        { name: 'Trimmers', slug: 'trimmers' },
        { name: 'Shavers', slug: 'shavers' },
        { name: 'Oral Care', slug: 'oral-care' },
      ]},
      { name: 'Health & Wellness', slug: 'health-wellness', children: [
        { name: 'Vitamins', slug: 'vitamins' },
        { name: 'Protein Supplements', slug: 'protein-supplements' },
        { name: 'First Aid', slug: 'first-aid' },
      ]},
    ],
  },
  {
    name: 'Books',
    slug: 'books',
    icon: '📚',
    order: 6,
    children: [
      { name: 'Fiction', slug: 'fiction' },
      { name: 'Non-Fiction', slug: 'non-fiction' },
      { name: 'Academic', slug: 'academic' },
      { name: 'Children Books', slug: 'children-books' },
      { name: 'Comics', slug: 'comics' },
      { name: 'Self Help', slug: 'self-help' },
    ],
  },
  {
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    icon: '⚽',
    order: 7,
    children: [
      { name: 'Exercise & Fitness', slug: 'exercise-fitness', children: [
        { name: 'Gym Equipment', slug: 'gym-equipment' },
        { name: 'Yoga', slug: 'yoga' },
        { name: 'Cardio', slug: 'cardio' },
      ]},
      { name: 'Sports', slug: 'sports', children: [
        { name: 'Cricket', slug: 'cricket' },
        { name: 'Football', slug: 'football' },
        { name: 'Badminton', slug: 'badminton' },
        { name: 'Tennis', slug: 'tennis' },
      ]},
      { name: 'Outdoor', slug: 'outdoor', children: [
        { name: 'Camping', slug: 'camping' },
        { name: 'Cycling', slug: 'cycling' },
        { name: 'Trekking', slug: 'trekking' },
      ]},
    ],
  },
  {
    name: 'Gaming',
    slug: 'gaming',
    icon: '🎮',
    order: 8,
    children: [
      { name: 'Gaming Consoles', slug: 'gaming-consoles' },
      { name: 'Video Games', slug: 'video-games' },
      { name: 'Gaming Accessories', slug: 'gaming-accessories' },
      { name: 'Gaming Chairs', slug: 'gaming-chairs' },
    ],
  },
  {
    name: 'Toys & Baby',
    slug: 'toys-baby',
    icon: '🧸',
    order: 9,
    children: [
      { name: 'Toys', slug: 'toys', children: [
        { name: 'Action Figures', slug: 'action-figures' },
        { name: 'Board Games', slug: 'board-games' },
        { name: 'Educational Toys', slug: 'educational-toys' },
        { name: 'Remote Control', slug: 'remote-control' },
      ]},
      { name: 'Baby Products', slug: 'baby-products', children: [
        { name: 'Diapers', slug: 'diapers' },
        { name: 'Baby Food', slug: 'baby-food' },
        { name: 'Strollers', slug: 'strollers' },
        { name: 'Baby Care', slug: 'baby-care' },
      ]},
    ],
  },
  {
    name: 'Grocery & Gourmet',
    slug: 'grocery',
    icon: '🛒',
    order: 10,
    children: [
      { name: 'Staples', slug: 'staples' },
      { name: 'Snacks', slug: 'snacks' },
      { name: 'Beverages', slug: 'beverages' },
      { name: 'Dairy', slug: 'dairy' },
      { name: 'Gourmet Foods', slug: 'gourmet-foods' },
    ],
  },
  {
    name: 'Pet Supplies',
    slug: 'pet-supplies',
    icon: '🐾',
    order: 11,
    children: [
      { name: 'Dog Supplies', slug: 'dog-supplies' },
      { name: 'Cat Supplies', slug: 'cat-supplies' },
      { name: 'Fish & Aquatics', slug: 'fish-aquatics' },
      { name: 'Bird Supplies', slug: 'bird-supplies' },
    ],
  },
  {
    name: 'Automotive',
    slug: 'automotive',
    icon: '🚗',
    order: 12,
    children: [
      { name: 'Car Accessories', slug: 'car-accessories' },
      { name: 'Bike Accessories', slug: 'bike-accessories' },
      { name: 'Car Electronics', slug: 'car-electronics' },
      { name: 'Helmets', slug: 'helmets' },
    ],
  },
];

async function insertCategories(categories: any[], parentId: string | null = null, level: number = 0) {
  const results = [];
  
  for (const cat of categories) {
    const { children, ...categoryData } = cat;
    
    const category = await Category.create({
      ...categoryData,
      parentId,
      level,
      isActive: true,
    });
    
    results.push(category);
    
    if (children && children.length > 0) {
      const childResults = await insertCategories(children, category._id.toString(), level + 1);
      results.push(...childResults);
    }
  }
  
  return results;
}

export async function POST() {
  try {
    await connectDB();
    
    await Category.deleteMany({});
    
    const categories = await insertCategories(categoriesData);

    return NextResponse.json({
      success: true,
      message: `Seeded ${categories.length} categories successfully!`,
      count: categories.length,
    });
  } catch (error: any) {
    console.error('Seed categories error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to seed categories',
    endpoint: '/api/categories/seed',
  });
}
