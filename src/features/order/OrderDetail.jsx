import React from 'react';
import { useParams } from 'react-router';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  ListItemSuffix,
} from '@material-tailwind/react';
import { useGetOrderByIdQuery } from './orderApi';
import { base } from '../../app/apiUrls';

const OrderDetail = ({ user }) => {
  const { id } = useParams();

  const { isLoading, data, error } = useGetOrderByIdQuery(
    { id, token: user?.token },
    { skip: !id || !user?.token }
  );

  if (!id) {
    return <h1 className="text-red-500 text-center mt-5">Invalid Order ID</h1>;
  }

  if (isLoading) return <h1 className="text-center mt-5">Loading...</h1>;
  if (error) return (
    <h1 className="text-red-500 text-center mt-5">
      {error?.data?.message || error?.message || "An error occurred"}
    </h1>
  );

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-2">Order Details</h1>
      <p className="text-gray-600 mb-4">Order ID: <span className="font-mono">{data?._id}</span></p>

      <Card className="max-w-full sm:max-w-xl mx-auto p-4">
        <List>
          {data?.books?.length > 0 ? (
            data.books.map((book) => {
              const { _id, title, image, price, description } = book.bookId || {};

              if (!book.bookId) return null;

              return (
                <ListItem key={book._id} className="items-start">
                  <ListItemPrefix>
                    <Avatar
                      variant="circular"
                      alt={title}
                      src={`${base}/${image}`}
                      className="w-14 h-14"
                    />
                  </ListItemPrefix>

                  <div className="flex-grow">
                    <Typography variant="h6" color="blue-gray">
                      {title}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal line-clamp-2">
                      {description}
                    </Typography>
                  </div>

                  <ListItemSuffix className="text-right">
                    <Typography variant="small" className="text-blue-600 font-semibold">
                      Rs. {price}
                    </Typography>
                    <Typography variant="small" className="text-gray-500">
                      Qty: {book.qty}
                    </Typography>
                  </ListItemSuffix>
                </ListItem>
              );
            })
          ) : (
            <ListItem>No items found in this order.</ListItem>
          )}
        </List>
      </Card>
    </div>
  );
};

export default OrderDetail;
