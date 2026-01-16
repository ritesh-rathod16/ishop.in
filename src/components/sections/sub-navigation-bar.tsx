"use client";

import React from 'react';
import { Menu } from 'lucide-react';

const SubNavigationBar = () => {
  const navLinks = [
    { label: 'Fresh', href: '/fresh' },
    { label: 'iShop Pay', href: '/pay' },
    { label: 'Gift Cards', href: '/gift-cards' },
    { label: "Today's Deals", href: '/deals' },
    { label: 'Sell', href: '/sell' },
    { label: 'iShop Basics', href: '/basics' },
    { label: 'Buy Again', href: '/buy-again' },
    { label: 'Gift Ideas', href: '/gift-ideas' },
    { label: 'Health, Household & Personal Care', href: '/health' },
    { label: 'Home Improvement', href: '/home-improvement' },
  ];

  return (
    <div 
      className="nav-sprite" 
      style={{ 
        backgroundColor: '#232f3e', 
        height: '39px', 
        display: 'flex', 
        alignItems: 'center', 
        width: '100%',
        padding: '0 0px',
        overflow: 'hidden'
      }}
    >
      <div className="flex items-center h-full">
        <a 
          href="#" 
          id="nav-hamburger-menu" 
          role="button" 
          aria-label="Open All Categories Menu"
          className="flex items-center h-[37px] px-[9px] mx-[1px] hover:outline hover:outline-1 hover:outline-white cursor-pointer group"
          style={{ transition: 'none' }}
        >
          <Menu className="text-white w-6 h-6 mr-1" strokeWidth={2.5} />
          <span className="text-white text-[14px] font-[700] leading-[39px]">All</span>
        </a>
      </div>

      <div className="flex items-center h-full flex-grow overflow-hidden">
        <ul className="flex items-center h-full m-0 p-0 list-none whitespace-nowrap">
          {navLinks.map((link, index) => (
            <li key={index} className="h-full flex items-center">
              <a
                href={link.href}
                className="text-white text-[14px] px-[9px] h-[37px] flex items-center hover:outline hover:outline-1 hover:outline-white whitespace-nowrap decoration-0 no-underline"
                style={{ 
                  fontFamily: 'inherit',
                  letterSpacing: '0.007em'
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden lg:flex items-center h-full pr-4">
        <a 
          href="/shop"
          className="h-[37px] flex items-center hover:outline hover:outline-1 hover:outline-white"
        >
          <span className="text-white text-[14px] font-[700] px-[9px]">Shop now</span>
        </a>
      </div>
    </div>
  );
};

export default SubNavigationBar;
