import React from 'react';
import { Avatar, Button, IconButton, Card, Typography } from '@material-tailwind/react';
import { base } from '../../app/apiUrls';
import { useNavigate } from 'react-router';
import RemoveDialog from './RemoveDialog';
import { useGetBooksQuery } from '../book/bookApi';

const AdminBook = () => {
  const { data, isLoading } = useGetBooksQuery();
  const nav = useNavigate();

  return (
    <div className="p-5 space-y-5">
      <div className="flex justify-end">
        <Button onClick={() => nav('/add-book')}>Add Book</Button>
      </div>
      {isLoading && <h1 className="text-center text-lg font-semibold">Loading...</h1>}

      {data && (
        <div className="w-full overflow-x-auto">
          <Card className="w-full overflow-scroll shadow-md">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-blue-gray-50">
                  <th className="p-4">Book Image</th>
                  <th className="p-4">Book Name</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 hidden md:table-cell">Created At</th>
                  <th className="p-4">Edit</th>
                  <th className="p-4">Remove</th>
                </tr>
              </thead>
              <tbody>
                {data.map(({ _id, title, image, createdAt, price }) => {
                  const imageUrl = image?.startsWith("http") ? image : `${base}${image}`;
                  const placeholderImage = "/path/to/placeholder-image.jpg"; // Replace this with your actual fallback image path

                  return (
                    <tr key={_id} className="hover:bg-gray-100 transition">
                      <td className="p-4">
                        <Avatar
                          src={imageUrl}
                          alt={title}
                          size="sm"
                          onError={(e) => (e.target.src = placeholderImage)} // Fallback on error
                        />
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {title}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          Rs. {price}
                        </Typography>
                      </td>
                      {/* Created At - Only Visible on Desktop */}
                      <td className="p-4 hidden md:table-cell">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {createdAt.substring(0, 10)}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <IconButton onClick={() => nav(`/edit-book/${_id}`)} size="sm" color="green">
                          <i className="fas fa-edit" />
                        </IconButton>
                      </td>
                      <td className="p-4">
                        <RemoveDialog id={_id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminBook;
