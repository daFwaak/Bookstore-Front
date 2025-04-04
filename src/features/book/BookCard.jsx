import { Typography } from "@material-tailwind/react";
import { base } from "../../app/apiUrls";
import { useNavigate } from "react-router";
import { useState } from "react";

// BookList component to display list of books
export function BookList({ books }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}

// BookCard component to display individual book
export function BookCard({ book }) {
  const nav = useNavigate();
  const [imageError, setImageError] = useState(false);

  // Handle image error, show placeholder if image fails to load
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => nav(`/book-detail/${book._id}`)}
    >
      <div className="h-[280px] w-[180px]">
        <img
          src={imageError ? "/path/to/placeholder-image.jpg" : `${base}${book.image}`} // Use placeholder image on error
          alt={book.title}
          onError={handleImageError} // Trigger error handler
          className="h-full w-full object-cover hover:scale-105 transition-transform"
          loading="lazy" // Lazy load the images
        />
      </div>

      <Typography className="mt-2 text-center text-sm font-medium text-gray-700 w-40">
        {book.title}
      </Typography>
    </div>
  );
}
