import React from 'react'
import AllOrder from './AllOrder'
import UserOrder from './UserOrder'

const OrderList = ({ user }) => {
  return (
    <div className='col-span-2'>
      {user?.role == 'admin' ? <AllOrder user={user} /> : <UserOrder user={user} />}
    </div>
  )
}

export default OrderList







