import React from "react";

const Contact = () => {
  return (
    <main className="flex-grow flex items-center justify-center bg-cover bg-center min-h-[calc(100vh-theme(height.32)-theme(height.16))]">
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-black mb-4">Contact Us</h1>
      <p className="text-black">
        Have any Qurery? Need assistance? Get in touch with us!
      </p>
      <div className="mt-6 space-y-4">
        <p className="text-black">
          📧 Email: <a href="mailto:support@minibookstore.com" className="text-blue-600 hover:underline">support@minibookstore.com</a>
        </p>
        <p className="text-black">
          📍 Address: Samakhusi Chwok, Kathmandu
        </p>
        <p className="text-black">
          📞 Phone: +977 9840860843
        </p>
      </div>
    </div>
    </main>
  );
};

export default Contact;
