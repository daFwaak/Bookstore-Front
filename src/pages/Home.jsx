import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookCard } from "../features/book/BookCard";
import { useGetBooksQuery } from "../features/book/bookApi";
import { Carousel } from "react-responsive-carousel";
import { Button, Input } from "@material-tailwind/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const slides = [
  {
    title: "Discover Amazing Stories",
    subtitle: "Uncover worlds beyond imagination in our bookstore",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Romance, Thrillers & More",
    subtitle: "Handpicked collections just for you",
    image: "https://plus.unsplash.com/premium_photo-1679404108270-71b22febf4f2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE3fHxib29rfGVufDB8fDB8fHww",
  },
  {
    title: "Books That Inspire",
    subtitle: "Fuel your mind and soul with powerful reads",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1600&q=80",
  },
];

const testimonials = [
  { name: "Sushant P.", comment: "Great collection of books! I found exactly what I was looking for. The site is easy to navigate, and the process was smooth." },
  { name: "Deepa K.", comment: "Fast delivery and good quality. The books arrived in perfect condition, and I'm very happy with my purchase." },
  { name: "Nandita R.", comment: "I love the selection of books here! The site is easy to use, and I found some great reads I didn’t know existed." },
  { name: "Pradeep W.", comment: "I had a great experience. The books are great, and the website is easy to use. I will definitely shop here again." },
  { name: "Rajan B.", comment: "Fantastic selection and smooth checkout. I found some wonderful books at good prices." },
  { name: "Sita S.", comment: "A great site for book lovers. It’s easy to find books, and I love the new arrivals section." },
  { name: "Arjun M.", comment: "Really good selection of books. I was able to easily filter by category and find books I’d been wanting to read." },
  { name: "Priya T.", comment: "The process was quick and easy. The books were well-packaged, and I’m happy with my order." },
];

const genres = ["Fiction", "Mystery & Thriller", "Romance", "non-fiction", "other"];

const Home = () => {
  const { data: books = [], isLoading } = useGetBooksQuery();
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);
  const latestBooks = [...books].reverse().slice(0, 4);
  const genreBooks = books.filter((book) => book.category === selectedGenre);

  return (
    <main className="w-full">
      {/* Hero Section */}
      <Carousel 
        autoPlay 
        infiniteLoop 
        showThumbs={false} 
        showStatus={false} 
        interval={3000} 
        transitionTime={800}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img src={slide.image} alt={slide.title} className="object-cover h-[90vh] w-full" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
              <h2 className="text-2xl md:text-4xl font-bold">{slide.title}</h2>
              <p className="text-lg md:text-2xl mt-4 max-w-2xl">{slide.subtitle}</p>
              <Link to="/books">
                <Button className="mt-6 hover:bg-black hover:text-white" color="white" size="lg">Explore Now</Button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>

      {/* New Arrivals */}
      <section className="py-20 px-4 w-full bg-gradient-to-r from-white via-gray-50 to-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">New Arrivals</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Discover the latest books from our bookstore.
          </p>
        </div>
        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex space-x-6 w-fit pb-2 mx-auto">
              {latestBooks.map((book) => (
                <div key={book._id} className="w-56 flex-shrink-0">
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Genre Category Tabs */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white text-center">
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Explore by Genres</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Whatever your flavor — mystery, romance, or non-fiction — we've got a page-turner for you.
          </p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 justify-center">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-5 py-2.5 rounded-full border text-sm md:text-base transition-all font-medium shadow ${
                selectedGenre === genre
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-indigo-50"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        {isLoading ? (
          <p className="text-center mt-6 text-gray-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12 mx-auto">
            {genreBooks.length > 0 ? (
              genreBooks.map((book) => <BookCard key={book._id} book={book} />)
            ) : (
              <p className="text-gray-600 col-span-full">No books found in this category.</p>
            )}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Testimonials</h2>
        <p className="text-gray-600 mb-12 text-center">What our customers are saying about our services.</p>
        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          transitionTime={800}
          showThumbs={false}
          showStatus={false}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-6">
              <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-xl shadow-md min-h-[300px] flex flex-col justify-center items-center text-center">
                <p className="italic mb-4 text-black">{`"${testimonial.comment}"`}</p>
                <h4 className="font-semibold text-right text-gray-900">- {testimonial.name}</h4>
              </div>
            </div>
          ))}
        </Carousel>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 px-6 bg-gray-800 text-white text-center">
        <p className="mb-6 text-lg">Get updates on new arrivals and special offers straight to your inbox.</p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
          <Input
            type="email"
            label="Enter your email"
            color="white"
            className="text-white"
            containerProps={{ className: "w-full sm:w-96" }}
          />
          <Button type="submit" color="white" className="text-black">
            Subscribe
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Home;
