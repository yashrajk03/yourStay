import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets/assets';
import StarRating from '../components/StarRating';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [availabilityMessage, setAvailabilityMessage] = useState('');

  useEffect(() => {
    const selectedRoom = roomsDummyData.find((room) => room._id === id);
    if (selectedRoom) {
      setRoom(selectedRoom);
      setMainImage(selectedRoom.images[0]);
    }
  }, [id]);

  const handleCheckAvailability = () => {
    if (!checkIn || !checkOut || !guests) {
      setAvailabilityMessage('Please fill in all fields.');
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      setAvailabilityMessage('Check-out must be after check-in.');
      return;
    }

    // Simulated logic: always available if dates are valid
    setAvailabilityMessage('✅ Room is available for your selected dates!');
  };

  return room && (
    <div className="py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32">
      
      {/* Room Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-playfair text-gray-800">
          {room.hotel.name} <span className="text-lg text-gray-500">({room.roomType})</span>
        </h1>
        <p className="text-green-600 text-sm font-semibold mt-1">🔥 20% OFF this week</p>
      </div>

      {/* Ratings */}
      <div className="flex items-center gap-3 mb-4">
        <StarRating />
        <p className="text-gray-500 text-sm">200+ reviews</p>
      </div>

      {/* Address */}
      <div className="flex items-center gap-2 text-gray-600 text-sm mb-6">
        <img src={assets.locationIcon} alt="Location Icon" className="w-4 h-4" />
        <span>{room.hotel.address}</span>
      </div>

      {/* Images */}
      <div className="mb-10">
        <div className="mb-4">
          <img
            src={mainImage}
            alt="Main Room"
            className="w-full max-h-[400px] object-cover rounded-lg shadow"
          />
        </div>
        <div className="flex gap-3 overflow-x-auto">
          {room.images.length > 1 &&
            room.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Room ${index + 1}`}
                onClick={() => setMainImage(image)}
                className={`w-20 h-16 object-cover rounded cursor-pointer transition-all duration-300 ${
                  mainImage === image ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'
                }`}
              />
            ))}
        </div>

        {/* Availability Form */}
        <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Check Availability</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Check-in Date</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Check-out Date</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Guests</label>
              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          <button
            onClick={handleCheckAvailability}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Check Availability
          </button>
          {availabilityMessage && (
            <p className="mt-3 text-sm text-blue-700">{availabilityMessage}</p>
          )}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Experience luxury like never before
        </h2>
        <div className="flex flex-wrap gap-4">
          {room.amenities.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-violet-100 text-gray-700 rounded-lg"
            >
              <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Price & Booking CTA */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t pt-6 mt-8">
        <p className="text-xl font-semibold text-gray-800">
          ${room.pricePerNight} <span className="text-sm font-normal text-gray-600">/ night</span>
        </p>
        <button className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all">
          Book Now
        </button>
      </div>
      <div>
        <div className='flex  flex-col items-start gap-4'>
          <img src={room.hot} alt="Host" className='h-14 w-14 
          md:h-18 md:w-18 rounded-full 
          ' />
          <p className='text-lg md:text-xl'>Hosted by{room.hotel.name}</p>
          <div className='flex items-center mt-1'>
            <StarRating/>
            <p className='ml-2'>200+ reviews</p>
          </div>
        </div>
      </div>


      {/*room description*/}
      <div className='mt-25 space-y-10'>
        {
          roomCommonData.map((spec,data)=>{
            return (
              <div key={data} className='flex items-center gap-2 mt-4'>
                <img src={spec.icon} alt={spec.title} className='w-6 h-6' />
                <p className='text-gray-700'>{spec.description}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default RoomDetails;
