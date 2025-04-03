import React, { useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  ShoppingCartIcon,
  ListBulletIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeUserFromLocal } from "../features/auth/userSlice";
import { removeFromCart } from "../features/cart/cartSlice";
import pp from '../images/pp.jpg';

const userMenuItems = [
  { label: "Profile", icon: UserCircleIcon, path: "/user-profile" },
  { label: "Cart", icon: ShoppingCartIcon, path: "/cart-page" },
  { label: "Sign Out", icon: PowerIcon },
];

const adminMenuItems = [
  { label: "Profile", icon: UserCircleIcon, path: "/user-profile" },
  { label: "Manage Books", icon: ListBulletIcon, path: "/admin-book" },
  { label: "Sign Out", icon: PowerIcon },
];

const ProfileMenu = ({ user }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = user.role === "admin" ? adminMenuItems : userMenuItems;

  const handleMenuClick = (label, path) => {
    if (label === "Sign Out") {
      dispatch(removeUserFromLocal());
      dispatch(removeFromCart());
    } else {
      nav(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button variant="text" className="flex items-center gap-1 rounded-full p-2 text-white">
          <Avatar variant="circular" size="sm" src={pp} />
          <ChevronDownIcon className={`h-4 w-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {menuItems.map(({ label, icon, path }) => (
          <MenuItem key={label} onClick={() => handleMenuClick(label, path)} className="flex items-center gap-2">
            {React.createElement(icon, { className: `h-4 w-4 ${label === "Sign Out" ? "text-red-500" : ""}` })}
            <Typography as="span" variant="small" className={`font-normal ${label === "Sign Out" ? "text-red-500" : ""}`}>
              {label}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

const Header = () => {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full bg-black">
      <Navbar fullWidth className="p-4 flex items-center justify-between text-white bg-black shadow-md">
        
        <Typography as="a" href="/" className="text-2xl font-bold cursor-pointer">
          Mini-Bookstore
        </Typography>

        <div className="hidden md:flex items-center gap-12">
          <Typography as="a" href="/" className="text-white hover:text-gray-400 transition duration-300 cursor-pointer">
            Home
          </Typography>
          <Typography as="a" href="/books" className="text-white hover:text-gray-400 transition duration-300 cursor-pointer">
            Books
          </Typography>
          <Typography as="a" href="/about" className="text-white hover:text-gray-400 transition duration-300 cursor-pointer">
            About Us
          </Typography>
          <Typography as="a" href="/contact" className="text-white hover:text-gray-400 transition duration-300 cursor-pointer">
            Contact Us
          </Typography>
        </div>

    
        <div className="flex items-center gap-4">
          {user ? (
            <ProfileMenu user={user} />
          ) : (
            <Button onClick={() => nav('/login')} className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition">
              Log In
            </Button>
          )}

      
          <IconButton className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </IconButton>
        </div>
      </Navbar>


      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 bg-black text-white p-4 transition-all duration-300">
          <Typography as="a" href="/" className="text-white hover:text-gray-400 transition duration-300 cursor-pointer">
            Home
          </Typography>
          <Typography as="a" href="/books" className="text-white hover:text-gray-400 transition duration-300 cursor-pointer">
            Books
          </Typography>
          <Typography as="a" href="/about" className="text-white hover:text-gray-400 transition duration-300 cursor-pointer">
            About Us
          </Typography>
          <Typography as="a" href="/contact" className="text-white hover:text-gray-400 transition duration-300 cursor-pointer">
            Contact Us
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Header;
