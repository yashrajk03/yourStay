import React, { useState } from 'react';
import { assets, facilityIcons, roomsDummyData } from '../assets/assets/assets';
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

// CheckBox component
const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className='font-light select-none'>{label}</span>
    </label>
  );
};

// RadioButton component
const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
      <input
        type="radio"
        name="sortoption"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className='font-light select-none'>{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);

  const roomTypes = ["Single Bed", "Double Bed", "Suite", "Family Suite"];
  const PriceRanges = ['0 to 500', '500 to 1000', '1000 to 2000', '2000 to 3000'];
  const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Newest First'];

  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState('');

  // Handlers
  const handleRoomTypeChange = (checked, label) => {
    setSelectedRoomTypes(prev =>
      checked ? [...prev, label] : prev.filter(type => type !== label)
    );
  };

  const handlePriceRangeChange = (checked, label) => {
    setSelectedPriceRanges(prev =>
      checked ? [...prev, label] : prev.filter(range => range !== label)
    );
  };

  const handleSortOptionChange = (label) => {
    setSelectedSortOption(label);
  };

  // Filter and sort logic
  let filteredRooms = [...roomsDummyData];

  if (selectedRoomTypes.length > 0) {
    filteredRooms = filteredRooms.filter(room =>
      selectedRoomTypes.includes(room.type)
    );
  }

  if (selectedPriceRanges.length > 0) {
    filteredRooms = filteredRooms.filter(room => {
      return selectedPriceRanges.some(range => {
        const [min, max] = range.replace(/\$/g, '').split(' to ').map(Number);
        return room.pricePerNight >= min && room.pricePerNight <= max;
      });
    });
  }

  if (selectedSortOption === 'Price: Low to High') {
    filteredRooms.sort((a, b) => a.pricePerNight - b.pricePerNight);
  } else if (selectedSortOption === 'Price: High to Low') {
    filteredRooms.sort((a, b) => b.pricePerNight - a.pricePerNight);
  } else if (selectedSortOption === 'Newest First') {
    filteredRooms.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-10 pt-28 md:pt-36 px-4 md:px-16 lg:px-24 xl:px-32">
      
      {/* Left Side (Room Listing) */}
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="font-playfair text-4xl md:text-5xl text-gray-900">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2 max-w-2xl">
            Explore our selection of luxurious hotel rooms, designed for your comfort and relaxation.
          </p>
        </div>

        {filteredRooms.map((room, index) => (
          <div
            key={room._id}
            className={`flex flex-col md:flex-row items-start gap-6 py-8 border-b border-gray-200 ${
              index === filteredRooms.length - 1 ? 'pb-10 border-b-0' : ''
            }`}
          >
            <img
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                scrollTo(0, 0);
              }}
              src={room.images[0]}
              alt={`Room at ${room.hotel.name}`}
              title="View Room Details"
              className="w-full md:w-64 h-44 object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
            />

            <div className="md:w-2/3 flex flex-col gap-2">
              <p className="text-gray-500 text-sm">{room.hotel.city}</p>

              <h2
                className="text-2xl md:text-3xl font-playfair text-gray-800 cursor-pointer hover:underline"
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
              >
                {room.hotel.name}
              </h2>

              <div className="flex items-center">
                <StarRating />
                <p className="ml-2 text-sm text-gray-600">200+ reviews</p>
              </div>

              <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                <img src={assets.locationIcon} alt="location icon" className="w-4 h-4" />
                <span>{room.hotel.address}</span>
              </div>

              <div className="flex flex-wrap items-center mt-4 mb-5 gap-3">
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-100/70 text-gray-700"
                  >
                    <img className="w-5 h-5" src={facilityIcons[item]} alt={item} />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>

              <p className="text-lg font-semibold text-gray-700">
                ${room.pricePerNight} <span className="text-sm font-normal">/night</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side (Filters) */}
      <aside className="w-full lg:w-[280px] bg-white rounded-md shadow-sm p-4 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          <div className="flex gap-2 text-sm text-blue-600 cursor-pointer">
            <span className="lg:hidden" onClick={() => setOpenFilter(false)}>Hide</span>
            <span
              className="hidden lg:block"
              onClick={() => {
                setSelectedRoomTypes([]);
                setSelectedPriceRanges([]);
                setSelectedSortOption('');
              }}
            >
              Clear
            </span>
          </div>
        </div>

        <div className={`${openFilter ? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-700`}>
          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Popular Filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox
                key={index}
                label={room}
                selected={selectedRoomTypes.includes(room)}
                onChange={handleRoomTypeChange}
              />
            ))}
          </div>

          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Price Range</p>
            {PriceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={`$${range}`}
                selected={selectedPriceRanges.includes(`$${range}`)}
                onChange={handlePriceRangeChange}
              />
            ))}
          </div>

          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Sort by</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedSortOption === option}
                onChange={handleSortOptionChange}
              />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AllRooms;
