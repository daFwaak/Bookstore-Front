import React from 'react';
import { useSelector } from 'react-redux';
import ProfileForm from './ProfileForm';
import OrderList from '../order/OrderList';

const Profile = () => {
  const { user } = useSelector((state) => state.userSlice);

  return (
    <main className="flex-grow flex items-center justify-center bg-cover bg-center min-h-[calc(100vh-theme(height.32)-theme(height.16))]">
      <div className="p-4 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProfileForm user={user} />
        <OrderList user={user} />
      </div>
    </main>
  );
};

export default Profile;
