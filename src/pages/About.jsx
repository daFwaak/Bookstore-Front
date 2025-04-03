import React from "react";

const About = () => {
  return (
    <main className="flex-grow flex items-center justify-center bg-cover bg-center min-h-[calc(100vh-theme(height.32)-theme(height.16))]">
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-black mb-4">About Us</h1>
      <p className="text-gray-600">
        Welcome to **Mini-Bookstore**, your go-to destination for books of all genres!  
        We are passionate about bringing the best books to readers around the world.  
        Our mission is to provide a seamless shopping experience and a vast collection  
        of books for all ages.
      </p>
      <p className="text-gray-600 mt-4">
        Whether you're a book lover or a casual reader, we strive to offer  
        something for everyone. Browse our selection and enjoy reading!
      </p>
    </div>
    </main>
  );
};

export default About;
