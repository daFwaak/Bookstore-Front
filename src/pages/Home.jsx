import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="flex-grow flex items-center justify-center bg-cover bg-center min-h-[calc(100vh-theme(height.32)-theme(height.16))]" 
      style={{
        backgroundImage:
          "url('')",
      }}
    >
      <div className="container mx-auto text-center text-black px-6 bg-opacity-50 py-10 rounded-lg">
        <h1 className="text-5xl font-bold">Welcome to Mini-Bookstore</h1>
        <p className="text-lg mt-2">Discover your next great read with us!</p>
        <Link to="/books">
        <button className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black border border-black transition-all duration-300">
          Explore
        </button>

        </Link>
      </div>
    </main>
  );
};

export default Home;
