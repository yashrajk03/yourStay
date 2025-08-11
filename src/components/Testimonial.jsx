import React from 'react';
import Title from './Title';
import { testimonials } from '../assets/assets/assets';
import StarRating from './StarRating';

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-28">
      <Title
        title="What our Guests Say"
        subTitle="Discover why discerning travellers consistently choose our hotels for their exclusive and luxurious accommodations around the world."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-xl text-gray-800">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.address}</p>
              </div>
            </div>

             <div className="flex items-center gap-1 mt-4 align-left">
                           <StarRating/>
                        </div>

            <p className="text-gray-600 mt-4 text-sm leading-relaxed">"{testimonial.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
