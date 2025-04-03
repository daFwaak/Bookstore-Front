import React from 'react'
import { useParams } from 'react-router'
import { useGetBookQuery } from '../book/bookApi';
import BookEditForm from './BookEditForm';

const BookEdit = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetBookQuery(id);
  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>{error.data?.message}</h1>
  }

  return (
    <div>
      {data && <BookEditForm book={data} />}

    </div>
  )
}

export default BookEdit







