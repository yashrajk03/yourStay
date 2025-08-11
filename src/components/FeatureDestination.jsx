import React from 'react';
import { roomsDummyData } from '../assets/assets/assets';
import HotelCard from './HotelCard';
import Title from './Title';
import { useNavigate } from 'react-router-dom';

const FeatureDestination = () => {
    const navigate = useNavigate();
  return (
    <section className="bg-slate-50 py-16 px-4 sm:px-8 lg:px-24">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-12">
        Featured Destinations
      </h2>
<Title   subTitle=' Discover our handPicked 
slection of the best hotels and resorts around the world.
'/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
        {roomsDummyData.map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>
      <button onClick={()=>{navigate('/rooms')}} className='my-16 px-4 py-2 text-sm font-medium birder border-gray-300
      rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>
        View ALl Destinations
      </button>
    </section>
  );
};

export default FeatureDestination;
