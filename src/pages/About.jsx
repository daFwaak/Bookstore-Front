import React from "react";

const About = () => {
  return (
    <main className="flex-grow flex items-center justify-center bg-cover bg-center min-h-[calc(100vh-theme(height.32)-theme(height.16))]">
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-black mb-4">About Us</h1>
      <p className="text-black">
        Welcome to Mini-Bookstore, which is little side project we have been working on for a while. we have little collection of books in our collection for now but we are working on it.
      </p>
      <p className="text-black mt-4">
        Whether you're a book lover or a casual reader, we strive to offer  
        something for everyone. Browse our selection and enjoy reading!
      </p>
    </div>
    </main>
  );
};

export default About;
