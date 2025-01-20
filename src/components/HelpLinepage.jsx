import React from "react";

const HelplinePage = () => {
  return (
    <div className="font-sans bg-gray-100 text-gray-800">
      <header className="bg-blue-900 text-white text-center py-8">
        <h1 className="text-2xl font-bold">24/7 Helpline</h1>
        <p className="text-lg mt-2">Always here to assist you anytime, anywhere!</p>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Contact Details Section */}
        <section className="bg-white hover:bg-blue-100 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900">Contact Details</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+18001234567"
                className="text-blue-600 underline hover:text-blue-800"
              >
                +1 800 123 4567
              </a>
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@busbooking.com"
                className="text-blue-600 underline hover:text-blue-800"
              >
                support@busbooking.com
              </a>
            </li>
          </ul>
        </section>

        {/* FAQs Section */}
        <section>
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Frequently Asked Questions (FAQs)
          </h2>
          <div className="space-y-4">
            <div className="faq-item bg-white border border-gray-200 rounded-lg p-4 shadow hover:bg-blue-100 transition duration-200">
              <h3 className="text-lg font-medium text-blue-900">
                How can I cancel my booking?
              </h3>
              <p className="text-gray-700 mt-2">
                To cancel your booking, go to the "My Bookings" section, select
                the booking, and click "Cancel".
              </p>
            </div>
            <div className="faq-item bg-white border border-gray-200 rounded-lg p-4 shadow hover:bg-blue-100 transition duration-200">
              <h3 className="text-lg font-medium text-blue-900">
                What payment methods are accepted?
              </h3>
              <p className="text-gray-700 mt-2">
                We accept credit cards, debit cards, and digital wallets.
              </p>
            </div>
            <div className="faq-item bg-white border border-gray-200 rounded-lg p-4 shadow hover:bg-blue-100 transition duration-200">
              <h3 className="text-lg font-medium text-blue-900">
                Can I modify my booking?
              </h3>
              <p className="text-gray-700 mt-2">
                Yes, you can modify your booking by contacting our support team
                or using the "Modify Booking" option online.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white text-center py-6">
        <p className="text-base">Need more help? Reach out to us anytime!</p>
      </footer>
    </div>
  );
};

export default HelplinePage;
