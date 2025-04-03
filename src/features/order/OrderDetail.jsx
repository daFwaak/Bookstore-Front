import React from 'react';
import { useGetOrderByIdQuery } from './orderApi';
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
import { base } from '../../app/apiUrls';

const OrderDetail = () => {
  const { id } = useParams();
  console.log("Order ID from URL:", id); // Debugging log

  // Prevent API call if id is undefined
  const { isLoading, data, error } = useGetOrderByIdQuery(id, { skip: !id });

  if (!id) {
    return <h1 className="text-red-500 text-center">Invalid Order ID</h1>;
  }

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error?.message || "An error occurred"}</h1>;

  return (
    <div className="p-5">
      <h1 className="text-xl font-semibold">Order Detail</h1>
      <hr className="my-3" />
      <h1 className="text-lg">Order ID: {data?._id}</h1>

      <Card className="w-96 mt-4">
        <List>
          {data?.books?.map((book) => {
            const { _id, title, image, price, description } = book.bookId || {};
            return (
              <ListItem key={book._id}>
                <ListItemPrefix>
                  <Avatar
                    variant="circular"
                    alt={title}
                    src={`${base}/${image}`} // Fixed API URL for images
                  />
                </ListItemPrefix>

                <div>
                  <Typography variant="h6" color="blue-gray">
                    {title}
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    {description}
                  </Typography>
                </div>

                <ListItemSuffix>
                  <h1>Rs. {price}</h1>
                  <p className="text-sm">Qty: {book.qty}</p>
                </ListItemSuffix>
              </ListItem>
            );
          })}
        </List>
      </Card>
    </div>
  );
};

export default OrderDetail;
