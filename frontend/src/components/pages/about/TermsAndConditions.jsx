import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms & Conditions</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          Welcome to Mesay Furniture. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. Please read them carefully before using our platform.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Use of the Website</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>You must be at least 18 years old or have parental consent to use this site.</li>
          <li>You agree not to use the website for any unlawful or prohibited activities.</li>
          <li>All information provided must be accurate and up-to-date.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Orders & Payments</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>All orders are subject to acceptance and availability.</li>
          <li>Prices and product descriptions are subject to change without notice.</li>
          <li>Payments must be made through the approved payment methods on our site.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Shipping & Delivery</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>We aim to deliver products within the estimated timeframes, but delays may occur.</li>
          <li>Shipping costs and delivery times are provided at checkout.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Returns & Refunds</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Returns are accepted within 7 days of delivery, provided items are unused and in original packaging.</li>
          <li>Refunds will be processed after inspection of returned items.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Intellectual Property</h2>
        <p>
          All content on this website, including text, images, logos, and designs, are the property of Mesay Fur or its licensors. Unauthorized use is prohibited.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
        <p>
          We are not liable for any indirect, incidental, or consequential damages arising from the use of our website or products.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
        <p>
          We reserve the right to update these Terms and Conditions at any time. Changes will be posted on this page.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
        <p>
          If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:support@mesayfur.com" className="text-blue-600 underline">support@mesayfur.com</a>.
        </p>
      </section>
      <div className="text-xs text-gray-500 mt-8 text-center">
        &copy; {new Date().getFullYear()} Mesay Furniture. All rights reserved.
      </div>
    </div>
  );
}