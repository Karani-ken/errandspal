import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SubscriptionPlans = () => {
  const navigate = useNavigate();

  const handleSubscribe = (planName, price) => {
    // Redirect to the payment page with subscription details
    navigate("/payment", { state: { planName, price } });
  };

  return (
    <section
      id="pricing"
      className="py-16 bg-blue-600 text-white text-center px-4"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl mb-8">Pricing Plans</h2>
        <div className="flex flex-wrap justify-around gap-6">
          {/* Pay-as-you-Go Plan */}
          <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg max-w-xs transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <h3 className="text-2xl mb-4 font-bold">Pay-as-you-Go</h3>
            <ul className="mb-6 list-none">
              <li className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                No monthly charges
              </li>
              <li className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                No subscriptions
              </li>
              <li className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                24/7 service
              </li>
              <li className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                Task tracking
              </li>
            </ul>
            <button
              onClick={() => handleSubscribe("Pay-as-you-Go", 0)}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              Start Now
            </button>
          </div>

          {/* Basic Plan */}
          <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg max-w-xs transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <h3 className="text-2xl mb-4 font-bold">Basic</h3>
            <p className="text-2xl mb-6 font-semibold text-teal-600">
              Kes 3,500/Month
            </p>
            <ul className="mb-6 list-none">
              <li className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                Up to 20 tasks
              </li>
              <li className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                2 recurring tasks
              </li>
              <li className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                Monthly subscription
              </li>
              <li className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                24/7 service
              </li>
              <li className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                Task tracking
              </li>
            </ul>
            <button
              onClick={() => handleSubscribe("Basic", 3500)}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              Subscribe
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg max-w-xs transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <h3 className="text-2xl mb-4 font-bold">Premium</h3>
            <p className="text-2xl mb-6 font-semibold text-teal-600">
              Kes 7,500/Month
            </p>
            <ul className="mb-6 list-none">
              <li className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                Unlimited tasks
              </li>
              <li className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                5 recurring tasks
              </li>
              <li className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                Monthly subscription
              </li>
              <li className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                24/7 service
              </li>
              <li className="flex items-center mb-2">
                <FaCheckCircle className="text-green-600 mr-2" />
                Task tracking
              </li>
            </ul>
            <button
              onClick={() => handleSubscribe("Premium", 7500)}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
