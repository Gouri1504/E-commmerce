import React from 'react';

function Sidebar({
  priceRange,
  setPriceRange,
  selectedCategory,
  setSelectedCategory,
  selectedColor,
  setSelectedColor,
}) {
  const categories = [
      "All",
  "men's clothing",
  "jewelery",
  "electronics",
  "women's clothing"
];
  const colors = ['All', 'Black', 'White', 'Red', 'Blue', 'Green'];

  return (
    <div className="w-64 bg-white p-6 rounded-lg shadow-md sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="space-y-6">
        {/* Gender */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Gender</h3>
          <div className="space-y-2">
            {['All', 'Men', 'Women'].map((gender) => (
              <label key={gender} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  className="h-4 w-4 text-[#0a2472] focus:ring-[#141e3d] border-gray-300"
                  defaultChecked={gender === 'All'}
                />
                <span className="ml-2 text-sm text-gray-700">{gender}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0].toFixed(2)}</span>
              <span>${priceRange[1].toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                  className="h-4 w-4 text-[#0a2472] focus:ring-[#141e3d] border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
          <div className="grid grid-cols-3 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-full px-2 py-1 text-xs rounded transition-all duration-300 ${
                  selectedColor === color
                    ? 'bg-[#0a2472] text-white scale-105'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;