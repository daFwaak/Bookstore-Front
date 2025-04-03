import React, { useEffect } from "react";
import {
  useGetCartQuery,
  useUpdateCartMutation,
  useRemoveFromCartMutation
} from "./cartApi";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./cartSlice";
import { useNavigate } from "react-router-dom"; 
import { Button } from "@material-tailwind/react";
import { useCreateOrderMutation } from "../order/orderApi";

const CartPage = () => {
  const { data: apiCart, isLoading, error, refetch } = useGetCartQuery();
  const [updateCart] = useUpdateCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [createOrder] = useCreateOrderMutation(); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const user = useSelector((state) => state.userSlice.user);

  useEffect(() => {
    if (apiCart) {
      dispatch(addToCart({
        items: apiCart.items,
        totalAmount: apiCart.items.reduce((sum, item) => sum + (item.bookId?.price || 0) * item.quantity, 0)
      }));
    }
  }, [apiCart, dispatch]);

  const handleUpdate = async (bookId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCart({ bookId, quantity }).unwrap();
      refetch();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await removeFromCart(bookId).unwrap();
      refetch();
    } catch (error) {
      console.error("Remove failed:", error);
    }
  };

  const handleOrder = async () => {
    if (!user?.token) {
      alert("You need to log in first!");
      return;
    }

    const orderData = {
      body: {
        items: apiCart.items.map((item) => ({
          bookId: item.bookId._id,
          quantity: item.quantity,
        })),
        totalAmount: apiCart.items.reduce(
          (sum, item) => sum + item.bookId?.price * item.quantity,
          0
        ),
      },
      token: user.token, 
    };

    try {
      await createOrder(orderData).unwrap();
      alert("Order placed successfully!");
      refetch(); 
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  if (isLoading) return <div>Loading cart...</div>;
  if (error) return <div>Error loading cart: {error.message}</div>;

  const totalAmount = apiCart?.items?.reduce((sum, item) => {
    return sum + (item.bookId?.price || 0) * item.quantity;
  }, 0);

  return (
    <main className="flex-grow flex items-center justify-center bg-cover bg-center min-h-[calc(100vh-theme(height.32)-theme(height.16))]">
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart ({apiCart?.items?.length})</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items Section */}
        <div className="md:col-span-2">
          {apiCart?.items?.map((item) => (
            <div key={item.bookId._id} className="flex items-center justify-between border-b pb-4 mb-4">
              <img src={item.bookId.imageUrl} alt={item.bookId.title} className="w-24 h-32 object-cover rounded-md" />
              
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold">{item.bookId?.title}</h3>
                <p className="text-gray-500">by {item.bookId?.author}</p>

                {/* Quantity Selector */}
                <div className="flex items-center mt-2">
                  <Button
                    color="gray"
                    size="sm"
                    variant="outlined"
                    className="rounded-md px-3"
                    onClick={() => handleUpdate(item.bookId._id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="mx-3 text-lg">{item.quantity}</span>
                  <Button
                    color="gray"
                    size="sm"
                    variant="outlined"
                    className="rounded-md px-3"
                    onClick={() => handleUpdate(item.bookId._id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Price & Remove Button */}
              <div className="text-right">
                <p className="text-lg font-semibold">Rs. {item.bookId?.price}</p>
                <button
                  onClick={() => handleRemove(item.bookId._id)}
                  className="text-red-500 mt-2 flex items-center"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="border rounded-lg p-6 shadow-sm bg-white">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between text-gray-700">
            <p>Subtotal</p>
            <p>Rs. {totalAmount.toFixed(2)}</p>
          </div>

          {/* Checkout Button */}
          <Button
            color="blue"
            size="lg"
            className="w-full mt-4"
            onClick={handleOrder}
          >
            PROCEED TO CHECKOUT
          </Button>
        </div>
      </div>
    </div>
    </main>
  );
};

export default CartPage;
