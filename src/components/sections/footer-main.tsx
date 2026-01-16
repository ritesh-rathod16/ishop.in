"use client";

import React from 'react';

const FooterMain: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="w-full font-sans text-[#0F1111]">
      <button
        onClick={scrollToTop}
        className="w-full py-[15px] bg-[#37475a] hover:bg-[#485769] text-white text-[13px] font-normal text-center cursor-pointer transition-colors duration-200"
      >
        Back to top
      </button>

      <div className="bg-[#232f3e] py-[40px] px-5">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-10 items-start">
          <div className="flex flex-col space-y-[10px]">
            <h3 className="text-white text-base font-bold mb-[6px]">Get to Know Us</h3>
            <ul className="space-y-[8px]">
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">About iShop</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">Careers</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">Press Releases</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">iShop Science</a></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-[10px]">
            <h3 className="text-white text-base font-bold mb-[6px]">Connect with Us</h3>
            <ul className="space-y-[8px]">
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">Facebook</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">Twitter</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">Instagram</a></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-[10px]">
            <h3 className="text-white text-base font-bold mb-[6px]">Make Money with Us</h3>
            <ul className="space-y-[8px]">
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">Sell on iShop</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">Sell under iShop Accelerator</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">Protect and Build Your Brand</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">iShop Global Selling</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">Supply to iShop</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">Become an Affiliate</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">Fulfilment by iShop</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">Advertise Your Products</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">iShop Pay on Merchants</a></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-[10px]">
            <h3 className="text-white text-base font-bold mb-[6px]">Let Us Help You</h3>
            <ul className="space-y-[8px]">
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">Your Account</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">Returns Centre</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">Recalls and Product Safety Alerts</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">100% Purchase Protection</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">iShop App Download</a></li>
              <li><a href="#" className="text-[#DDD] text-[14px] hover:underline">Help</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#232f3e] border-t border-[#3a4553] pt-8 pb-8">
        <div className="max-w-[1000px] mx-auto flex flex-col items-center justify-center space-y-6 md:flex-row md:space-y-0 md:space-x-20">
          <div className="h-[31px] w-[95px] relative">
            <div className="text-white font-bold text-2xl tracking-tighter cursor-pointer flex items-center">
              iShop<span className="text-[#FF9900] text-sm font-normal ml-0.5">.in</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button className="flex items-center space-x-2 px-2 py-1.5 border border-[#848688] rounded-[3px] text-[#CCC] text-xs hover:border-white">
              <span className="text-sm">EN</span>
              <span>English</span>
            </button>
            <button className="flex items-center space-x-2 px-2 py-1.5 border border-[#848688] rounded-[3px] text-[#CCC] text-xs hover:border-white">
              <span>India</span>
            </button>
          </div>
        </div>

        <div className="max-w-[1000px] mx-auto mt-6 px-4">
          <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[#CCC] text-[12px]">
            {['Australia', 'Brazil', 'Canada', 'China', 'France', 'Germany', 'Italy', 'Japan', 'Mexico', 'Netherlands', 'Poland', 'Singapore', 'Spain', 'Turkey', 'United Arab Emirates', 'United Kingdom', 'United States'].map((country) => (
              <li key={country} className="hover:underline cursor-pointer">{country}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-[#131a22] py-8 px-5">
        <div className="max-w-[1000px] mx-auto flex flex-col items-center space-y-2">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-2">
            <a href="#" className="text-white text-[12px] hover:underline">Conditions of Use & Sale</a>
            <a href="#" className="text-white text-[12px] hover:underline">Privacy Notice</a>
            <a href="#" className="text-white text-[12px] hover:underline">Interest-Based Ads</a>
          </div>
          <div className="text-white text-[12px] font-normal">
            © 1996-2024, iShop.in, Inc. or its affiliates
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMain;
