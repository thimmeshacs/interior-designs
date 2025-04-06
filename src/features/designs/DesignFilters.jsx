import { useState } from "react";

function DesignFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    bhk: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Filter Designs</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="">All</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Hall">Hall</option>
            <option value="Bedroom">Bedroom</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price Range</label>
          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="">All</option>
            <option value="0-50000">₹0 - ₹50,000</option>
            <option value="50000-100000">₹50,000 - ₹1,00,000</option>
            <option value="100000+">₹1,00,000+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">BHK</label>
          <select
            name="bhk"
            value={filters.bhk}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="">All</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default DesignFilters;
