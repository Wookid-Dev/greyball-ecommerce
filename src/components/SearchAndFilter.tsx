import { FaSearch } from "react-icons/fa";
import { useState } from "react";

interface SearchAndFilterProps {
  search: string;
  setSearch: (val: string) => void;
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  setPriceRange: (range: [number, number]) => void;
  setRatingRange: (range: [number, number]) => void;
}

const SearchAndFilter = ({
  search,
  setSearch,
  categories,
  selectedCategory,
  setSelectedCategory,
  setPriceRange,
  setRatingRange,
}: SearchAndFilterProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000);
  const [ratingMin, setRatingMin] = useState(0);
  const [ratingMax, setRatingMax] = useState(5);

  const handlePriceChange = () => {
    setPriceRange([priceMin, priceMax]);
  };

  const handleRatingChange = () => {
    setRatingRange([ratingMin, ratingMax]);
  };

  // Clear filters handler
  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSearch("");
    setPriceMin(0);
    setPriceMax(1000);
    setRatingMin(0);
    setRatingMax(5);

    setPriceRange([0, 1000]);
    setRatingRange([0, 5]);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl p-6 bg-gray-50 shadow-md rounded-lg mt-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Found {categories.length} categories
          </h2>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all"
            onClick={handleClearFilters}
          >
            Clear filter
          </button>
        </div>

        <div className="flex gap-4 mb-6 flex-wrap justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`border border-gray-300 px-4 py-2 shadow-sm rounded-lg text-sm font-medium hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="border border-gray-300 p-3 pl-10 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full text-left bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all"
          >
            {isDropdownOpen ? "Hide Filters" : "Show Filters"}
          </button>

          {isDropdownOpen && (
            <div className="mt-4">
              {/* Price Range Slider */}
              <div className="mb-6">
                <h3 className="text-gray-700 font-medium mb-2">
                  Filter by Price
                </h3>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceMin}
                    onChange={(e) => setPriceMin(Number(e.target.value))}
                    onMouseUp={handlePriceChange}
                    className="w-full"
                  />
                  <span className="w-20 text-center text-gray-700">
                    ${priceMin}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    onMouseUp={handlePriceChange}
                    className="w-full"
                  />
                  <span className="w-20 text-center text-gray-700">
                    ${priceMax}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-gray-700 font-medium mb-2">
                  Filter by Rating
                </h3>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={ratingMin}
                    onChange={(e) => setRatingMin(Number(e.target.value))}
                    onMouseUp={handleRatingChange}
                    className="w-full"
                  />
                  <span className="w-20 text-center text-gray-700">
                    {ratingMin.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={ratingMax}
                    onChange={(e) => setRatingMax(Number(e.target.value))}
                    onMouseUp={handleRatingChange}
                    className="w-full"
                  />
                  <span className="w-20 text-center text-gray-700">
                    {ratingMax.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
