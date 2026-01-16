"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import HeaderNavigation from "@/components/sections/header-navigation";
import FooterMain from "@/components/sections/footer-main";
import { useCart } from '@/context/CartContext';
import { Star, ShieldCheck, Truck, RotateCcw, MapPin } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  rating: number;
  reviews: number;
  brand: string;
  features: string[];
  stock: number;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data since DB connection is unstable
        const mockProduct = {
          _id: String(id),
          name: 'Apple iPhone 15 Pro Max (256GB) - Natural Titanium',
          description: 'iPhone 15 Pro Max. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
          price: 159900,
          originalPrice: 179900,
          discount: 11,
          image: 'https://m.media-amazon.com/images/I/81SigpJN1KL._SX679_.jpg',
          rating: 4.5,
          reviews: 2340,
          brand: 'Apple',
          features: ['A17 Pro chip', '48MP camera', 'Titanium design', 'USB-C'],
          stock: 50
        };
        setProduct(mockProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <HeaderNavigation />
        <div className="flex justify-center items-center h-[500px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#232f3e]"></div>
        </div>
        <FooterMain />
      </div>
    );
  }

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      brand: product.brand
    });
    alert('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderNavigation />
      <main className="max-w-[1500px] mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="sticky top-4">
              <img src={product.image} alt={product.name} className="max-w-full max-h-[600px] object-contain" />
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/4">
            <h1 className="text-[24px] font-medium leading-tight mb-2">{product.name}</h1>
            <p className="text-[#007185] hover:text-[#c45500] cursor-pointer text-[14px] mb-2">Visit the {product.brand} Store</p>
            
            <div className="flex items-center mb-4 border-b pb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "#febd69" : "none"} stroke={i < Math.floor(product.rating) ? "#febd69" : "#565959"} />
                ))}
              </div>
              <span className="text-[#007185] text-[14px]">{product.reviews.toLocaleString()} ratings</span>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-[#CC0C39] text-[28px] font-light">-{product.discount}%</span>
                <span className="text-[28px] font-medium">
                  <span className="text-[13px] align-top mt-2 mr-1">₹</span>
                  {product.price.toLocaleString()}
                </span>
              </div>
              <p className="text-[14px] text-[#565959]">M.R.P.: <span className="line-through">₹{product.originalPrice.toLocaleString()}</span></p>
              <p className="text-[14px] mb-2">Inclusive of all taxes</p>
              <p className="text-[14px] font-bold">EMI starts at ₹{Math.floor(product.price / 12).toLocaleString()}. No Cost EMI available</p>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-6 border-y py-4 text-center">
              <div className="flex flex-col items-center">
                <RotateCcw className="text-[#007185] w-6 h-6 mb-1" />
                <span className="text-[12px] text-[#007185]">7 days Replacement</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="text-[#007185] w-6 h-6 mb-1" />
                <span className="text-[12px] text-[#007185]">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="text-[#007185] w-6 h-6 mb-1" />
                <span className="text-[12px] text-[#007185]">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="text-[#007185] w-6 h-6 mb-1" />
                <span className="text-[12px] text-[#007185]">iShop Delivered</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[14px] mb-2">About this item</h3>
              <ul className="list-disc list-inside text-[14px] space-y-1">
                {product.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Buy Section */}
          <div className="w-full md:w-[250px]">
            <div className="border border-[#D5D9D9] rounded-[8px] p-4 sticky top-4">
              <div className="text-[28px] font-medium mb-1">
                <span className="text-[13px] align-top mt-2 mr-1">₹</span>
                {product.price.toLocaleString()}
              </div>
              <p className="text-[#007185] text-[14px] mb-2">FREE delivery <span className="font-bold text-black">Tomorrow, 12 March</span>. Order within <span className="text-[#007600]">12 hrs 45 mins</span></p>
              
              <div className="flex items-center gap-1 mb-4">
                <MapPin size={16} />
                <span className="text-[12px] text-[#007185]">Delivering to Mumbai 400001 - Update location</span>
              </div>

              <div className="text-[#007600] text-[18px] mb-4">In stock</div>

              <div className="mb-4">
                <label className="text-[14px] block mb-1">Quantity:</label>
                <select 
                  className="w-full border rounded bg-[#F0F2F2] p-1 text-[14px] shadow-sm focus:outline-none"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#FFD814] hover:bg-[#F7CA00] py-2 rounded-full text-[14px] shadow-sm transition-colors"
                >
                  Add to Cart
                </button>
                <button className="w-full bg-[#FFA41C] hover:bg-[#FA8900] py-2 rounded-full text-[14px] shadow-sm transition-colors">
                  Buy Now
                </button>
              </div>

              <div className="mt-4 pt-4 border-t text-[12px] text-[#565959]">
                <div className="flex justify-between mb-1">
                  <span>Ships from</span>
                  <span className="text-[#0F1111]">iShop.in</span>
                </div>
                <div className="flex justify-between">
                  <span>Sold by</span>
                  <span className="text-[#0F1111]">{product.brand} India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterMain />
    </div>
  );
}
