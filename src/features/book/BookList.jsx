import React from 'react'
import { useGetBooksQuery } from './bookApi';
import { BookCard } from './BookCard';

const BookList = () => {

  const { data, isLoading, error } = useGetBooksQuery();

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1>{error.data?.message}</h1>
  return (
    <div className='grid grid-cols-5 gap-4'>  

      {data && data.map((book) => {
        return <BookCard key={book._id} book={book} />
      })}

    </div>
  )
}
export default BookList
