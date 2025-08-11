import React from 'react';
import { assets } from '../assets/assets/assets';
import Title from './Title';

const ExclusiveOffers = () => {
  return (
    <div
      className='relative bg-cover bg-center bg-no-repeat py-20 px-4 sm:px-8 lg:px-24 text-white'
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-6 max-w-2xl mx-auto">
        <Title
          title="Exclusive Offers"
          subTitle="Take advantage of our limited-time offers and special packages designed to make your stay even more memorable."
        />

        <button className="group inline-flex items-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all shadow-lg">
          View Exclusive Offers
          <img
            src={assets.arrowIcon}
            alt="arrow icon"
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};

export default ExclusiveOffers;
