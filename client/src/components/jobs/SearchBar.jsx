import { useState } from "react";

const SearchBar = ({ onSearch, categories }) => {
  const [filters, setFilters] = useState({
    search: "",
    employmentType: "",
    location: "",
    category: "",
    workExperience: "",
    dateOfPosting: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          name="search"
          placeholder="Search jobs..."
          value={filters.search}
          onChange={handleChange}
          className="flex-1 p-2 border rounded"
        />
        <select
          name="employmentType"
          value={filters.employmentType}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Employment Type</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="internship">Internship</option>
          <option value="any">Any</option>
        </select>
      </div>

      <div className="flex gap-4">
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="p-2 border rounded flex-1"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          name="workExperience"
          value={filters.workExperience}
          onChange={handleChange}
          className="p-2 border rounded flex-1"
        >
          <option value="">Experience Level</option>
          <option value="0-1 years">0-1 years</option>
          <option value="1-3 years">1-3 years</option>
          <option value="3-5 years">3-5 years</option>
          <option value="more than 5 years">5+ years</option>
          <option value="any">Any</option>
        </select>

        <select
          name="dateOfPosting"
          value={filters.dateOfPosting}
          onChange={handleChange}
          className="p-2 border rounded flex-1"
        >
          <option value="">Any Time</option>
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search Jobs
      </button>
    </form>
  );
};

export default SearchBar;