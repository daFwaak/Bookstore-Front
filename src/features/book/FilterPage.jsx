import React, { useState } from 'react';
import { useGetBooksQuery } from '../book/bookApi';
import { BookCard } from '../book/BookCard';

const FilterPage = () => {
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const { data: books = [], isLoading, error } = useGetBooksQuery();

  const handleApplyFilters = () => {
    if (!books.length) return;

    const filtered = books.filter((book) => {
      const matchesCategory =
        category === 'All' || book.category.trim().toLowerCase() === category.trim().toLowerCase();
      const matchesPrice =
        Number(book.price) >= priceRange[0] && Number(book.price) <= priceRange[1];

      return matchesCategory && matchesPrice;
    });

    setFilteredBooks(filtered);
  };

  const getFilterLabel = () => {
    const categoryLabel = category !== 'All' ? `Category: ${category}` : '';
    const priceLabel = priceRange[0] !== 0 || priceRange[1] !== 1000
      ? `Price: Nrs ${priceRange[0]} - Nrs ${priceRange[1]}`
      : '';
    return [categoryLabel, priceLabel].filter(Boolean).join(', ') || 'All Books';
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error?.message}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Filter Books</h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Mystery & Thriller">Mystery & Thriller</option>
          <option value="Romance">Romance</option>
          <option value="Non-fiction">Non-fiction</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={priceRange.join(',')}
          onChange={(e) => {
            const [min, max] = e.target.value.split(',').map(Number);
            setPriceRange([min, max]);
          }}
          className="p-2 border rounded"
        >
          <option value="0,1000">All Prices</option>
          <option value="100,200">Nrs 100 - Nrs 200</option>
          <option value="200,300">Nrs 200 - Nrs 300</option>
          <option value="300,400">Nrs 300 - Nrs 400</option>
          <option value="400,500">Nrs 400 - Nrs 500</option>
          <option value="500,1000">Above Nrs 500</option>
        </select>

        <button
          onClick={handleApplyFilters}
          className="ml-auto px-3 py-1 bg-black text-white rounded-lg hover:bg-white hover:text-black border border-black transition-all duration-300"
        >
          Apply Filters
        </button>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-lg">Showing results for: {getFilterLabel()}</p>
      </div>

      <div className="mt-6">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p>No books found matching your filters.</p>
        )}
      </div>
    </div>
  );
};

export default FilterPage;
