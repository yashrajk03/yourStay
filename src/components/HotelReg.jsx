import React from 'react';
import { assets, cities } from '../assets/assets/assets';

const HotelReg = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">
      <form className="flex max-w-4xl max-md:mx-2 bg-white rounded-xl overflow-hidden max-md:flex-col">
        {/* Left image (hidden on small screens) */}
        <img
          src={assets.regImage}
          alt="reg-image"
          className="w-1/2 hidden md:block object-cover"
        />

        {/* Right form content */}
        <div className="relative md:w-1/2 p-8 md:p-10 flex flex-col gap-4">
          <img
            src={assets.closeIcon}
            alt="close-icon"
            className="absolute top-4 right-4 h-5 w-5 cursor-pointer"
          />

          <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>

          {/* Hotel Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium text-gray-500 mb-1">
              Enter Hotel Name
            </label>
            <input
              id="name"
              placeholder="Type Here"
              className="border border-gray-200 rounded w-full py-2.5 px-3 outline-indigo-500 font-light"
              type="text"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="contact" className="font-medium text-gray-500 mb-1">
              Phone
            </label>
            <input
              id="contact"
              placeholder="Type Here"
              className="border border-gray-200 rounded w-full py-2.5 px-3 outline-indigo-500 font-light"
              type="text"
              required
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="font-medium text-gray-500 mb-1">
              Address
            </label>
            <input
              id="address"
              placeholder="Type Here"
              className="border border-gray-200 rounded w-full py-2.5 px-3 outline-indigo-500 font-light"
              type="text"
              required
            />
          </div>

          {/* City select */}
          <div className="flex flex-col max-w-xs w-full">
            <label
              className="font-medium text-gray-500 mb-1"
              htmlFor="city"
            >
              City
            </label>
            <select
              id="city"
              className="border border-gray-200 rounded w-full px-3 py-2.5 outline-indigo-500 font-light"
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white px-6 py-2 rounded cursor-pointer mt-6 self-start"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
