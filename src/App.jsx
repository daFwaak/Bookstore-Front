import React from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom';
import Login from './features/auth/Login';
import RootLayout from './ui/RootLayout';
import Register from './features/auth/Register';
import CartPage from './features/cart/CartPage';
import Profile from './features/profile/Profile';
import OrderDetail from './features/order/OrderDetail';
import AuthRoutes from './ui/AuthRoutes';
import AdminRoutes from './ui/AdminRoutes';
import BookList from './features/book/BookList';
import BookDetail from './features/book/BookDetail';
import AdminBook from './features/admin/AdminBook';
import AddBook from './features/admin/AddBook';
import BookEdit from './features/admin/BookEdit';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';


const App = () => {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [

        {
          index: true,
          element: <Home />,
        },
        {
          path: 'books',
          element: <BookList />,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'contact',
          element: <Contact />,
        },


        {
          path: 'login',
          element: <Login />,
        },

        {
          path: 'register',
          element: <Register />,
        },


        {
          element: <AuthRoutes />,
          children: [
            {
              path: 'user-profile',
              element: <Profile />,
            },
            {
              path: 'cart-page',
              element: <CartPage />,
            },
          ]
        },

        {
          path: 'book-detail/:id',
          element: <BookDetail />,

        },

        
        {

          element: <AdminRoutes />,
          children: [
            {
              path: 'admin-book',
              element: <AdminBook />,
            },
            {
              path: 'add-book',
              element: <AddBook />,
            },
            {
              path: 'edit-book/:id',
              element: <BookEdit />,
            },
          ]

        },


        {
          path: 'order/:id',
          element: <OrderDetail />,
        }


      ]
    },



  ]);


  return < RouterProvider router={router} />
}

export default App
