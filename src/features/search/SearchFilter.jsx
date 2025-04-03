import { useState } from "react";
import { useGetBooksQuery } from "../features/bookApi";

const SearchFilter = ({ setFilteredBooks }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { data: books, isLoading } = useGetBooksQuery({
    search,
    category,
    minPrice,
    maxPrice,
  });

  const handleSearch = () => {
    setFilteredBooks(books || []);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search by title..."
        className="p-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select className="p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Fiction">Fiction</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="Mystery & Thriller">Mystery & Thriller</option>
        <option value="Romance">Romance</option>
        <option value="Other">Other</option>
      </select>

      <div className="flex gap-2">
        <input type="number" placeholder="Min Price" className="p-2 border rounded" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <input type="number" placeholder="Max Price" className="p-2 border rounded" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>

      <button className="p-2 bg-blue-500 text-white rounded" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchFilter;
