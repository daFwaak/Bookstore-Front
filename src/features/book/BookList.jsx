import React from "react";
import { useGetBooksQuery } from "./bookApi";
import { BookCard } from "./BookCard";

const BookList = () => {
  const { data, isLoading, error } = useGetBooksQuery();

  if (isLoading) return <h1 className="text-center text-xl">Loading...</h1>;
  if (error) return <h1 className="text-center text-red-500">{error.data?.message}</h1>;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data && data.map((book) => <BookCard key={book._id} book={book} />)}
      </div>
    </div>
  );
};

export default BookList;
