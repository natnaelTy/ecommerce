import React from "react";

export default function About() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-10">
      {/* Top Wave */}
      <svg
        className="absolute top-0 left-0 w-full h-32"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 1 }}
      >
        <path
          fill="#fbbf24"
          fillOpacity="0.3"
          d="M0,160L60,154.7C120,149,240,139,360,154.7C480,171,600,213,720,197.3C840,181,960,107,1080,101.3C1200,96,1320,160,1380,192L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
      </svg>

      <div className="relative  max-w-3xl mx-auto pt-24 pb-10 px-4">
        <h1 className="text-4xl font-extrabold mb-4 text-center text-orange-500 drop-shadow">
          About Us
        </h1>
        <p className="mb-8 text-lg text-gray-500 text-center">
          Welcome to <span className="font-semibold text-pink-500">Messay Furniture</span>!
          <br />
          We are passionate about helping you create a beautiful and comfortable home with quality furniture and outstanding service.
        </p>
        <div className="mb-8 bg-white/80 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-orange-500">Our Story</h2>
          <p className="text-gray-600">
            Founded in 2015, Messay Furniture was born from a love for design and a desire to make stylish, durable furniture accessible to everyone.
            We carefully curate our collections to offer a wide range of products, from modern sofas to classic bedroom sets, all at affordable prices.
          </p>
        </div>
        <div className="mb-8 bg-white/80 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-orange-500">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to provide you with the best online furniture shopping experience.
            We believe your home should reflect your personality and lifestyle, and we are here to help you find the perfect pieces to make that happen.
          </p>
        </div>
        <div className="mb-8 bg-white/80 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-orange-500">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Wide selection of quality furniture</li>
            <li>Affordable prices and regular discounts</li>
            <li>Fast and reliable delivery</li>
            <li>Friendly customer support</li>
            <li>Easy returns and secure payments</li>
          </ul>
        </div>
        <div className="bg-white/80 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-orange-500">Contact Us</h2>
          <p className="text-gray-600">
            Have questions or need help? Reach out to our team at{" "}
            <a href="mailto:support@furnishop.com" className="text-orange-700 underline">
              support@furnishop.com
            </a>{" "}
            or call us at <span className="font-semibold">+251 900 000 000</span>.
          </p>
        </div>
      </div>

      {/* Bottom Wave */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 1 }}
      >
        <path
          fill="#fbbf24"
          fillOpacity="0.3"
          d="M0,224L60,192C120,160,240,96,360,101.3C480,107,600,181,720,197.3C840,213,960,171,1080,154.7C1200,139,1320,149,1380,154.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </svg>
    </div>
  );
}