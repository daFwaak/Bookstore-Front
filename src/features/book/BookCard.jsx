import { Typography } from "@material-tailwind/react";
import { base } from "../../app/apiUrls";
import { useNavigate } from "react-router";

export function BookList({ books }) {
  return (
    <div>
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}

export function BookCard({ book }) {
  const nav = useNavigate();

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => nav(`/book-detail/${book._id}`)}
    >
      
      <div className="h-[280px] w-[180px] ">
        <img
          src={`${base}${book.image}`}
          alt={book.title}
          className="h-full w-full object-cover"
        />
      </div>
     
      <Typography className="mt-2 text-center text-sm font-medium text-gray-700 w-40">
        {book.title}
      </Typography>
    </div>
  );
}
