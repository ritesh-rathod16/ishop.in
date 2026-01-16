"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, ShoppingCart, MapPin, Menu, ChevronDown, ChevronRight, X, Clock, TrendingUp, Folder, Globe, Check } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  translation?: string;
}

const languages: Language[] = [
  { code: 'EN', name: 'English', nativeName: 'English' },
  { code: 'HI', name: 'Hindi', nativeName: 'हिन्दी', translation: 'अनुवाद' },
  { code: 'TA', name: 'Tamil', nativeName: 'தமிழ்', translation: 'மொழிபெயர்ப்பு' },
  { code: 'TE', name: 'Telugu', nativeName: 'తెలుగు', translation: 'అనువాదం' },
  { code: 'KN', name: 'Kannada', nativeName: 'ಕನ್ನಡ', translation: 'ಭಾಷಾಂತರ' },
  { code: 'ML', name: 'Malayalam', nativeName: 'മലയാളം', translation: 'വിവർത്തനം' },
  { code: 'BN', name: 'Bengali', nativeName: 'বাংলা', translation: 'অনুবাদ' },
  { code: 'MR', name: 'Marathi', nativeName: 'मराठी', translation: 'भाषांतर' },
];

interface Suggestion {
  type: 'category' | 'suggestion' | 'popular' | 'product';
  text: string;
  image?: string;
  price?: number;
  id?: string;
  category?: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  children?: Category[];
}

const HeaderNavigation = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [trending, setTrending] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const [showSidebar, setShowSidebar] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [tempLanguage, setTempLanguage] = useState('EN');
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  useEffect(() => {
    fetch('/api/categories?tree=true')
      .then(res => res.json())
      .then(data => {
        if (data.success) setCategories(data.categories);
      })
      .catch(console.error);
  }, []);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ q: query });
      if (selectedCategory) params.set('category', selectedCategory);
      
      const res = await fetch(`/api/search/autocomplete?${params}`);
      const data = await res.json();
      
      if (data.success) {
        setSuggestions(data.suggestions || []);
        if (data.trending) setTrending(data.trending);
      }
    } catch (error) {
      console.error('Autocomplete error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    if (searchQuery.trim()) {
      debounceRef.current = setTimeout(() => {
        fetchSuggestions(searchQuery);
      }, 200);
    } else {
      setSuggestions([]);
    }
    
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery, fetchSuggestions]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams({ q: searchQuery.trim() });
      if (selectedCategory) params.set('category', selectedCategory);
      router.push(`/search?${params}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    if (suggestion.type === 'product' && suggestion.id) {
      router.push(`/product/${suggestion.id}`);
    } else if (suggestion.type === 'category' && suggestion.category) {
      router.push(`/category/${suggestion.category}`);
    } else {
      const params = new URLSearchParams({ q: suggestion.text });
      if (suggestion.category) params.set('category', suggestion.category);
      router.push(`/search?${params}`);
    }
    setShowSuggestions(false);
    setSearchQuery(suggestion.text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? <strong key={i} className="text-[#c45500]">{part}</strong> : part
    );
  };

  const categoryItems = [
    { name: 'All', slug: '' },
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Fashion', slug: 'fashion' },
    { name: 'Home & Kitchen', slug: 'home-kitchen' },
    { name: 'Books', slug: 'books' },
    { name: 'Mobiles', slug: 'mobiles' },
    { name: 'Computers', slug: 'computers' },
    { name: 'Gaming', slug: 'gaming' },
  ];

  return (
    <>
      <header className="w-full flex flex-col font-sans text-[14px]">
        <div className="bg-[#131921] text-white h-[60px] flex items-center px-[11px] gap-[2px]">
          <Link href="/" className="flex items-center hover:outline hover:outline-1 hover:outline-white p-[8px] cursor-pointer h-[50px]">
            <div className="relative w-[100px] h-[30px] mt-[6px]">
              <div className="text-[22px] font-bold leading-none tracking-tighter flex items-baseline">
                iShop<span className="text-[#febd69] text-[14px] ml-[1px]">.in</span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[8px] bg-transparent border-b-[2px] border-[#febd69] rounded-full transform translate-y-[-8px]"></div>
            </div>
          </Link>

          <div className="flex items-center hover:outline hover:outline-1 hover:outline-white p-[8px] cursor-pointer h-[50px] ml-[2px]">
            <div className="pt-[14px]">
              <MapPin className="w-[18px] h-[18px]" />
            </div>
            <div className="flex flex-col ml-[2px]">
              <span className="text-[12px] text-[#ccc] leading-[14px]">Delivering to Mumbai 400001</span>
              <span className="text-[14px] font-bold leading-[15px]">Update location</span>
            </div>
          </div>

          <div ref={searchRef} className="flex-grow flex h-[40px] mx-[10px] relative">
            <form 
              onSubmit={handleSearch}
              className="flex w-full bg-white rounded-[4px] focus-within:ring-[3px] focus-within:ring-[#ff9900] overflow-visible"
            >
              <div 
                className="relative bg-[#f3f3f3] hover:bg-[#dadada] border-r border-[#bbb] flex items-center px-[10px] cursor-pointer group rounded-l-[4px]"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                <span className="text-[12px] text-[#555] group-hover:text-[#000] min-w-[30px]">
                  {categoryItems.find(c => c.slug === selectedCategory)?.name || 'All'}
                </span>
                <ChevronDown className="w-[14px] h-[14px] ml-[5px] text-[#555]" />
                
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 w-[200px] bg-white border border-gray-300 rounded shadow-lg z-50 mt-1">
                    {categoryItems.map((cat) => (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCategory(cat.slug);
                          setShowCategoryDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm text-[#0f1111] hover:bg-[#f3f3f3] ${
                          selectedCategory === cat.slug ? 'bg-[#febd69]/20 font-medium' : ''
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Search iShop.in" 
                className="flex-grow px-[10px] text-[15px] text-[#0f1111] focus:outline-none"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(-1);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
              
              <button 
                type="submit"
                className="bg-[#febd69] hover:bg-[#f3a847] w-[45px] flex items-center justify-center cursor-pointer transition-colors duration-200 rounded-r-[4px]"
              >
                <Search className="w-[22px] h-[22px] text-[#333]" />
              </button>
            </form>

            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-[400px] overflow-y-auto">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="inline-block w-5 h-5 border-2 border-gray-300 border-t-[#febd69] rounded-full animate-spin"></div>
                  </div>
                ) : suggestions.length > 0 ? (
                  <div>
                    {suggestions.map((suggestion, idx) => (
                      <div
                        key={`${suggestion.type}-${idx}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors ${
                          selectedIndex === idx ? 'bg-[#f3f3f3]' : 'hover:bg-[#f7f7f7]'
                        }`}
                      >
                        {suggestion.type === 'category' && (
                          <Folder className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                        {suggestion.type === 'popular' && (
                          <TrendingUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                        {suggestion.type === 'suggestion' && (
                          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                        {suggestion.type === 'product' && suggestion.image && (
                          <img src={suggestion.image} alt="" className="w-10 h-10 object-contain flex-shrink-0" />
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] text-[#0f1111] truncate">
                            {highlightMatch(suggestion.text, searchQuery)}
                          </p>
                          {suggestion.type === 'category' && (
                            <p className="text-xs text-gray-500">in {suggestion.text}</p>
                          )}
                          {suggestion.type === 'product' && suggestion.price && (
                            <p className="text-xs text-[#b12704] font-medium">₹{suggestion.price.toLocaleString()}</p>
                          )}
                        </div>
                        
                        {suggestion.category && suggestion.type !== 'category' && (
                          <span className="text-xs text-gray-400 flex-shrink-0">in {suggestion.category}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : searchQuery.trim() === '' && trending.length > 0 ? (
                  <div className="p-3">
                    <p className="text-xs font-bold text-gray-600 mb-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Trending Searches
                    </p>
                    {trending.map((term, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSearchQuery(term);
                          router.push(`/search?q=${encodeURIComponent(term)}`);
                          setShowSuggestions(false);
                        }}
                        className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#f7f7f7] cursor-pointer rounded"
                      >
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-[#0f1111]">{term}</span>
                      </div>
                    ))}
                  </div>
                ) : searchQuery.trim() !== '' ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No suggestions found
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <div className="flex items-center hover:outline hover:outline-1 hover:outline-white p-[8px] cursor-pointer h-[50px] relative group">
            <div className="flex items-center gap-[4px] mt-[12px]">
              <div className="w-[20px] h-[15px] bg-white relative overflow-hidden flex flex-col">
                <div className="w-full h-[5px] bg-[#FF9933]"></div>
                <div className="w-full h-[5px] bg-white flex items-center justify-center">
                  <div className="w-[3px] h-[3px] rounded-full bg-blue-800"></div>
                </div>
                <div className="w-full h-[5px] bg-[#128807]"></div>
              </div>
              <span className="font-bold text-[14px]">EN</span>
              <ChevronDown className="w-[10px] h-[10px] text-[#ccc] mt-[4px]" />
            </div>
          </div>

          {user ? (
            <div className="relative group">
              <div className="flex flex-col justify-center hover:outline hover:outline-1 hover:outline-white p-[8px] cursor-pointer h-[50px] leading-tight">
                <span className="text-[12px]">Hello, {user.name.split(' ')[0]}</span>
                <div className="flex items-center">
                  <span className="text-[14px] font-bold">Account & Lists</span>
                  <ChevronDown className="w-[10px] h-[10px] text-[#ccc] ml-[2px] mt-[4px]" />
                </div>
              </div>
              <div className="absolute top-full right-0 w-[200px] bg-white shadow-lg rounded-b border border-[#ddd] hidden group-hover:block z-50">
                <div className="p-3 border-b">
                  <p className="text-[#0F1111] text-[14px] font-bold">{user.name}</p>
                  <p className="text-[#565959] text-[12px]">{user.email}</p>
                </div>
                <Link href="/account" className="block px-3 py-2 text-[#0F1111] text-[13px] hover:bg-[#f3f3f3]">
                  Your Account
                </Link>
                <Link href="/orders" className="block px-3 py-2 text-[#0F1111] text-[13px] hover:bg-[#f3f3f3]">
                  Your Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-[#0F1111] text-[13px] hover:bg-[#f3f3f3] border-t"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="flex flex-col justify-center hover:outline hover:outline-1 hover:outline-white p-[8px] cursor-pointer h-[50px] leading-tight">
              <span className="text-[12px]">Hello, sign in</span>
              <div className="flex items-center">
                <span className="text-[14px] font-bold">Account & Lists</span>
                <ChevronDown className="w-[10px] h-[10px] text-[#ccc] ml-[2px] mt-[4px]" />
              </div>
            </Link>
          )}

          <Link href="/orders" className="flex flex-col justify-center hover:outline hover:outline-1 hover:outline-white p-[8px] cursor-pointer h-[50px] leading-tight">
            <span className="text-[12px]">Returns</span>
            <span className="text-[14px] font-bold">& Orders</span>
          </Link>

          <Link href="/cart" className="flex items-end hover:outline hover:outline-1 hover:outline-white p-[8px] cursor-pointer h-[50px] relative">
            <div className="relative">
              <span className="absolute left-[13px] top-[-8px] text-[#f08804] text-[16px] font-bold">{cartCount}</span>
              <ShoppingCart className="w-[38px] h-[32px]" strokeWidth={1.5} />
            </div>
            <span className="text-[14px] font-bold mb-[2px]">Cart</span>
          </Link>
        </div>

        <div className="bg-[#232f3e] text-white h-[39px] flex items-center px-[10px] overflow-hidden">
          <button 
            onClick={() => setShowSidebar(true)}
            className="flex items-center hover:outline hover:outline-1 hover:outline-white px-[8px] py-[6px] cursor-pointer h-full gap-[4px]"
          >
            <Menu className="w-[24px] h-[24px]" />
            <span className="font-bold text-[14px]">All</span>
          </button>

          <div className="flex items-center h-full text-[14px] whitespace-nowrap overflow-hidden">
            {[
              { name: "Best Sellers", href: "/bestsellers" },
              { name: "Mobiles", href: "/mobiles" },
              { name: "Today's Deals", href: "/deals" },
              { name: "Prime", href: "/prime" },
              { name: "New Releases", href: "/new-releases" },
              { name: "Customer Service", href: "/help" },
              { name: "Electronics", href: "/electronics" },
              { name: "Fashion", href: "/fashion" },
              { name: "Home & Kitchen", href: "/home-kitchen" },
              { name: "Books", href: "/books" },
              { name: "Computers", href: "/computers" },
              { name: "Gift Cards", href: "/gift-cards" },
              { name: "iShop Pay", href: "/pay" },
              { name: "Sell", href: "/sell" },
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="px-[10px] py-[6px] hover:outline hover:outline-1 hover:outline-white text-white no-underline border-none"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {showSidebar && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
            onClick={() => setShowSidebar(false)}
          />
          <div className="fixed left-0 top-0 h-full w-[365px] bg-white z-[101] shadow-2xl flex animate-slide-in">
            <div className="w-full h-full flex flex-col overflow-hidden">
              <div className="bg-[#232f3e] text-white px-6 py-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#febd69] rounded-full flex items-center justify-center">
                  <span className="text-[#232f3e] font-bold">
                    {user ? user.name.charAt(0).toUpperCase() : '👤'}
                  </span>
                </div>
                <span className="font-bold text-lg">Hello, {user ? user.name.split(' ')[0] : 'Sign in'}</span>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="py-2">
                  <h3 className="px-6 py-2 font-bold text-[#0f1111] text-lg">Shop By Category</h3>
                  
                  {categories.map((category) => (
                    <div 
                      key={category._id}
                      className="relative"
                      onMouseEnter={() => setHoveredCategory(category)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <Link
                        href={`/category/${category.slug}`}
                        onClick={() => setShowSidebar(false)}
                        className="flex items-center justify-between px-6 py-3 hover:bg-[#eaeded] text-[#0f1111]"
                      >
                        <span className="flex items-center gap-3">
                          {category.icon && <span className="text-lg">{category.icon}</span>}
                          <span>{category.name}</span>
                        </span>
                        {category.children && category.children.length > 0 && (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="border-t py-2">
                  <h3 className="px-6 py-2 font-bold text-[#0f1111] text-lg">Programs & Features</h3>
                  {[
                    { name: 'Prime', href: '/prime' },
                    { name: 'Gift Cards', href: '/gift-cards' },
                    { name: 'iShop Pay', href: '/pay' },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setShowSidebar(false)}
                      className="flex items-center justify-between px-6 py-3 hover:bg-[#eaeded] text-[#0f1111]"
                    >
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>

                <div className="border-t py-2">
                  <h3 className="px-6 py-2 font-bold text-[#0f1111] text-lg">Help & Settings</h3>
                  {[
                    { name: 'Your Account', href: '/account' },
                    { name: 'Customer Service', href: '/help' },
                    { name: user ? 'Sign Out' : 'Sign In', href: user ? '#' : '/login', action: user ? handleLogout : undefined },
                  ].map((item) => (
                    item.action ? (
                      <button
                        key={item.name}
                        onClick={() => { item.action?.(); setShowSidebar(false); }}
                        className="w-full flex items-center px-6 py-3 hover:bg-[#eaeded] text-[#0f1111] text-left"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setShowSidebar(false)}
                        className="flex items-center px-6 py-3 hover:bg-[#eaeded] text-[#0f1111]"
                      >
                        {item.name}
                      </Link>
                    )
                  ))}
                </div>
              </div>
            </div>

            {hoveredCategory && hoveredCategory.children && hoveredCategory.children.length > 0 && (
              <div 
                className="absolute left-[365px] top-0 h-full w-[300px] bg-white shadow-lg border-l overflow-y-auto"
                onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="p-4">
                  <h4 className="font-bold text-[#0f1111] text-lg mb-3">{hoveredCategory.name}</h4>
                  {hoveredCategory.children.map((subcat) => (
                    <div key={subcat._id}>
                      <Link
                        href={`/category/${subcat.slug}`}
                        onClick={() => setShowSidebar(false)}
                        className="block py-2 text-[#0f1111] hover:text-[#c45500] font-medium"
                      >
                        {subcat.name}
                      </Link>
                      {subcat.children && subcat.children.length > 0 && (
                        <div className="ml-4">
                          {subcat.children.slice(0, 5).map((child) => (
                            <Link
                              key={child._id}
                              href={`/category/${child.slug}`}
                              onClick={() => setShowSidebar(false)}
                              className="block py-1 text-sm text-gray-600 hover:text-[#c45500]"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setShowSidebar(false)}
              className="absolute top-4 right-[-50px] w-10 h-10 bg-transparent text-white hover:text-[#febd69] flex items-center justify-center"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes slide-in {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default HeaderNavigation;
