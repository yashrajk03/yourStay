import React from 'react';
import Title from '../../components/Title';
import { assets } from '../../assets/assets/assets';

const AddRoom = () => {
  const [images, setImages] = React.useState({ 1: null, 2: null, 3: null, 4: null });
  const [inputs, setInputs] = React.useState({
    RoomType: '',
    pricePerNight: 0,
    amenities: {
      'Free Wifi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    },
  });

  return (
    <form>
      <Title
        align="left"
        title="Add Room"
        subTitle="Fill in the details carefully and accurate room details, pricing, and amenities to enhance the user booking experience"
      />

      {/* Upload images */}
      <p className="text-gray-800 mt-10">Images</p>
      <div className="flex gap-4">
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key} className="cursor-pointer">
            <img
              src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
              alt={`Upload ${key}`}
              className="w-32 h-24 object-cover rounded border border-gray-300"
            />
            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              onChange={(e) => setImages({ ...images, [key]: e.target.files[0] })}
            />
          </label>
        ))}
      </div>

      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-xs">
          <p>Room Type</p>
          <select
            value={inputs.RoomType}
            onChange={(e) => setInputs({ ...inputs, RoomType: e.target.value })}
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        <div>
          <p>
            Price <span className="text-xs">/night</span>
          </p>
          <input
            type="number"
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-24"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: Number(e.target.value) || 0 })
            }
            min={0}
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-800">Amenities</p>
        <div className="flex flex-col flex-wrap mt-1 text-gray-700 max-w-sm gap-2">
          {Object.keys(inputs.amenities).map((amenity, index) => (
            <label key={index} htmlFor={`amenities${index + 1}`} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`amenities${index + 1}`}
                checked={inputs.amenities[amenity]}
                onChange={() =>
                  setInputs({
                    ...inputs,
                    amenities: {
                      ...inputs.amenities,
                      [amenity]: !inputs.amenities[amenity],
                    },
                  })
                }
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      <button className="bg-indigo-600 text-white px-8 py-2 rounded mt-8 cursor-pointer">
        Add Room
      </button>
    </form>
  );
};

export default AddRoom;
