import React from "react";
import { Typography } from "@material-tailwind/react";

const LINKS = [
  {
    title: "QUICK LINKS",
    items: ["Home", "Books", "FAQs" ],
  },
  {
    title: "ABOUT",
    items: ["About us", "Contact us" , "Terms & Conditions", "Privacy Policy"],
  },
  {
    title: "GENRES",
    items: ["Fiction", "Mystery & Thriller", "Romance", "Non-fiction", "Other"],
  },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="mx-auto w-full max-w-7xl px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Typography variant="h5" className="mb-6 text-white">
            Mini-Bookstore
          </Typography>

          {/* Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  className="mb-3 font-medium text-gray-400"
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      className="text-white py-1.5 font-normal transition-colors hover:text-gray-400"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-center border-t border-gray-700 pt-4 md:flex-row md:justify-between">
          <Typography variant="small" className="text-center text-gray-400">
            &copy; {currentYear} Mini-Bookstore. All Rights Reserved.
          </Typography>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            {["facebook", "instagram", "twitter", "github"].map((icon) => (
              <Typography
                as="a"
                key={icon}
                href="#"
                className="text-white opacity-80 transition-opacity hover:opacity-100"
              >
                <i className={`fab fa-${icon} text-xl`}></i>
              </Typography>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
