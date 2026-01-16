"use client";

import React from 'react';
import Link from 'next/link';

interface CategoryItem {
  title: string;
  image: string;
  link: string;
}

interface QuadrantCardProps {
  title: string;
  items: CategoryItem[];
  footerLabel: string;
  footerLink: string;
  singleImage?: boolean;
  bannerImage?: string;
}

const QuadrantCard: React.FC<QuadrantCardProps> = ({ title, items, footerLabel, footerLink, singleImage, bannerImage }) => {
  return (
    <div className="bg-white p-[20px] flex flex-col h-full min-h-[420px] relative z-10">
      <h2 className="text-[21px] font-bold text-[#0F1111] mb-[10px] leading-[1.3]">
        {title}
      </h2>
      {singleImage && bannerImage ? (
        <Link href={footerLink} className="block flex-grow mb-4">
          <div className="relative w-full h-full min-h-[280px] overflow-hidden bg-[#F3F3F3]">
            <img
              src={bannerImage}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          </div>
        </Link>
      ) : (
        <div className="grid grid-cols-2 gap-x-[12px] gap-y-[20px] mb-[16px] flex-grow">
          {items.map((item, idx) => (
            <Link key={idx} href={item.link} className="group block focus:outline-none">
              <div className="relative aspect-square w-full overflow-hidden bg-[#F3F3F3]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-[12px] text-[#0F1111] mt-[6px] group-hover:text-[#C7511F] line-clamp-1">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      )}
      <Link
        href={footerLink}
        className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline block mt-auto pt-[12px]"
      >
        {footerLabel}
      </Link>
    </div>
  );
};

const CategoryGridCards: React.FC = () => {
  const sections = [
    {
      title: 'Up to 55% off | Appliances for your home',
      footerLabel: 'See all deals',
      footerLink: '/home-kitchen',
      items: [
        { title: 'Air conditioners', image: 'https://m.media-amazon.com/images/I/31Xl40FPtYL._AC_SY200_.jpg', link: '/category/air-conditioners' },
        { title: 'Refrigerators', image: 'https://m.media-amazon.com/images/I/71K3HIc8aJL._AC_SY200_.jpg', link: '/category/refrigerators' },
        { title: 'Microwaves', image: 'https://m.media-amazon.com/images/I/31V8A2bK6AL._AC_SY200_.jpg', link: '/category/microwaves' },
        { title: 'Washing machines', image: 'https://m.media-amazon.com/images/I/41u683Gf4TL._AC_SY200_.jpg', link: '/category/washing-machines' },
      ],
    },
    {
      title: 'Starting ₹149 | Headphones & Earbuds',
      footerLabel: 'See all offers',
      footerLink: '/electronics',
      items: [
        { title: 'Starting ₹149 | boAt', image: 'https://m.media-amazon.com/images/I/51Q+JytbfCL._AC_SY200_.jpg', link: '/search?q=boat+earbuds' },
        { title: 'Starting ₹349 | Boult', image: 'https://m.media-amazon.com/images/I/61+btxzpfDL._AC_SY200_.jpg', link: '/search?q=boult+earbuds' },
        { title: 'Starting ₹649 | Noise', image: 'https://m.media-amazon.com/images/I/61RJZynP6TL._AC_SY200_.jpg', link: '/search?q=noise+smartwatch' },
        { title: 'Starting ₹149 | Zebronics', image: 'https://m.media-amazon.com/images/I/71r3e5L2bEL._AC_SY200_.jpg', link: '/search?q=zebronics' },
      ],
    },
    {
      title: 'Revamp your home in style',
      footerLabel: 'Explore all',
      footerLink: '/home-kitchen',
      items: [
        { title: 'Bedsheets & curtains', image: 'https://m.media-amazon.com/images/I/81xp7JKAH4L._AC_SY200_.jpg', link: '/category/bedsheets' },
        { title: 'Home decor', image: 'https://m.media-amazon.com/images/I/61XNRtlPqGL._AC_SY200_.jpg', link: '/category/home-decor' },
        { title: 'Home storage', image: 'https://m.media-amazon.com/images/I/61tL8H9zUBL._AC_SY200_.jpg', link: '/category/storage' },
        { title: 'Lighting solutions', image: 'https://m.media-amazon.com/images/I/61XNRtlPqGL._AC_SY200_.jpg', link: '/category/lighting' },
      ],
    },
    {
      title: 'Up to 60% off | Styles for men',
      footerLabel: 'See all',
      footerLink: '/fashion',
      items: [
        { title: 'Clothing', image: 'https://m.media-amazon.com/images/I/61hh4tbYLpL._AC_SY200_.jpg', link: '/fashion?category=men-clothing' },
        { title: 'Footwear', image: 'https://m.media-amazon.com/images/I/71DUW2gU9uL._AC_SY200_.jpg', link: '/fashion?category=men-footwear' },
        { title: 'Watches', image: 'https://m.media-amazon.com/images/I/71MQRqCQMtL._AC_SY200_.jpg', link: '/fashion?category=watches' },
        { title: 'Bags & wallets', image: 'https://m.media-amazon.com/images/I/71cWJKRqh7L._AC_SY200_.jpg', link: '/fashion?category=bags' },
      ],
    },
  ];

  return (
    <section className="relative w-full max-w-[1500px] mx-auto px-5 -mt-[280px] md:-mt-[340px] lg:-mt-[360px] pb-5 pointer-events-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pointer-events-auto">
        {sections.map((section, index) => (
          <QuadrantCard
            key={index}
            title={section.title}
            items={section.items}
            footerLabel={section.footerLabel}
            footerLink={section.footerLink}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryGridCards;
