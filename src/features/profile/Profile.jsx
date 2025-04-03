import React from 'react'
import { useSelector } from 'react-redux';
import ProfileForm from './ProfileForm';
import OrderList from '../order/OrderList';

const Profile = () => {
  const { user } = useSelector((state) => state.userSlice);


  return (
    <main className='flex-growflex-grow flex items-center justify-center bg-cover bg-center min-h-[calc(100vh-theme(height.32)-theme(height.16))]'>
    <div className='p-4 grid grid-cols-3 gap-10'>

      <ProfileForm user={user} />
      <OrderList user={user} />
    </div>
    </main>
  )
}

export default Profile
