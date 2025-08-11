import React, { useState } from 'react';
import Title from '../components/Title';
import { assets, userBookingsDummyData } from '../assets/assets/assets';

const MyBookings = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData);

  return (
    <div className='py-28 md:pb-36 px-4 md:pt-32 lg:px-24 xl:px-32 bg-gray-50 min-h-screen'>
      <Title title="My Bookings" subTitle="Manage your bookings here" align="left" />

      <div className='max-w-6xl mx-auto mt-8 w-full text-gray-800'>
        {/* Header Row */}
        <div className='hidden md:grid grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3 bg-white rounded-t-lg shadow-sm'>
          <div>Hotels</div>
          <div>Date & Time</div>
          <div>Payments</div>
        </div>

        {/* Bookings List */}
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full py-6 md:py-4 border-b border-gray-200 bg-white hover:shadow-md transition-shadow duration-300 last:rounded-b-lg'
          >
            {/* Hotel details */}
            <div className='flex flex-col md:flex-row gap-4 md:gap-0'>
              <img
                src={booking.room.images[0]}
                alt="hotel-img"
                className='w-full md:w-44 h-32 md:h-auto object-cover rounded-lg shadow-md'
              />
              <div className='flex flex-col gap-2 mt-4 md:mt-0 md:ml-6'>
                <p className='font-playfair text-2xl md:text-xl font-bold'>
                  {booking.hotel.name}
                  <span className='font-inter text-sm text-gray-600 ml-2'>({booking.room.roomType})</span>
                </p>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <img src={assets.locationIcon} alt="location" className='w-4 h-4' />
                  <span>{booking.hotel.address}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <img src={assets.guestsIcon} alt="guest" className='w-4 h-4' />
                  <span>Guests: {booking.guests}</span>
                </div>
                <p className='text-base font-semibold text-gray-800'>Total: ${booking.totalPrice}</p>
              </div>
            </div>

            {/* Date and time */}
            <div className='flex flex-row md:flex-col justify-between md:justify-center md:items-center gap-6 md:gap-4 mt-6 md:mt-0'>
              <div>
                <p className='font-medium'>Check In</p>
                <p className='text-gray-600 text-sm'>{new Date(booking.checkInDate).toDateString()}</p>
              </div>
              <div>
                <p className='font-medium'>Check Out</p>
                <p className='text-gray-600 text-sm'>{new Date(booking.checkOutDate).toDateString()}</p>
              </div>
            </div>

            {/* Payment details */}
            <div className='flex flex-col items-start md:items-center justify-center mt-6 md:mt-0 gap-3'>
              <div className='flex items-center gap-2'>
                <div className={`h-3 w-3 rounded-full ${booking.isPaid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <p className={`text-sm font-medium ${booking.isPaid ? 'text-green-500' : 'text-red-500'}`}>
                  {booking.isPaid ? 'Paid' : 'Not Paid'}
                </p>
              </div>
              {!booking.isPaid && (
                <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-medium text-sm'>
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;