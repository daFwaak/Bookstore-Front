import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useGetBooksQuery } from "../book/bookApi";
import { BookCard } from "../book/BookCard";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery();
  const keyword = query.get("keyword") || "";
  const category = query.get("category") || "All";
  const priceRange = query.get("priceRange")
    ? query.get("priceRange").split(",").map(Number)
    : [0, 1000];

  const { data: books = [], isLoading, error } = useGetBooksQuery();

  const filteredBooks = useMemo(() => {
    let results = [...books];

    if (keyword) {
      results = results.filter((book) =>
        book.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    results = results.filter(
      (book) => book.price >= priceRange[0] && book.price <= priceRange[1]
    );

    if (category !== "All") {
      results = results.filter((book) => book.category === category);
    }

    return results;
  }, [books, keyword, category, priceRange]);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for: "{keyword}"</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <p>No books found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;