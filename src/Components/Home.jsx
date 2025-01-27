import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaClock, FaBullhorn, FaUserAlt, FaStar, FaTshirt, FaPaw, FaShoppingCart, FaBox, FaEnvelope } from 'react-icons/fa'; // Adding new icons
import Bg from '../assets/bg.webp';

const Home = () => {
  return (
    <div className="font-sans bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">ErrandsPal</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#pricing" className="hover:underline">Pricing</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
              <li><a href="#services" className="hover:underline">Services</a></li>
            </ul>
          </nav>
          <Link to='/login'>Login</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative text-white text-center py-16"
        style={{
          backgroundImage: `url(${Bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-800 opacity-90"></div>
        <div className="container mx-auto relative z-10 px-4">
          <h2 className="text-4xl font-bold mb-4 text-center sm:text-3xl md:text-4xl">Your personal errands assistant, just a click away</h2>
          <p className="text-lg mb-6">Manage all your tasks and errands effortlessly with ErrandsPal.</p>
          <a
            href="#features"
            className="bg-white text-blue-600 py-3 px-6 rounded-lg text-lg hover:bg-blue-700 hover:text-white transition duration-300"
          >
            Explore Features
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-10 bg-white text-center px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl mb-6">About ErrandsPal</h2>
          <p className="text-lg mb-6">
            ErrandsPal is your personal assistant that simplifies your daily tasks. 
            From running errands and managing your to-do list to handling time-consuming jobs, 
            we provide a range of services including laundry pick-up, pet walking, and shopping. 
            Focus on what matters while we take care of the rest. Our easy-to-use platform is available 24/7, 
            ensuring convenience and efficiency. Join thousands of satisfied customers and let ErrandsPal 
            be your trusted helper, always ready to assist you.
          </p>
        </div>
      </section>

      {/* Errands We Run Section */}
      <section id="services" className="py-10 bg-gray-100 text-center px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl mb-8">Errands We Run</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Laundry Pick-Up and Drop-Off */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <FaTshirt className="text-4xl text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Laundry Pick-Up & Drop-Off</h3>
              <p className="text-lg">We’ll pick up your laundry and have it cleaned and delivered back to you!</p>
            </div>
            {/* Pet Walking */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <FaPaw className="text-4xl text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Pet Walking</h3>
              <p className="text-lg">Need a walk for your furry friend? We’ve got it covered!</p>
            </div>
            {/* Shopping */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <FaShoppingCart className="text-4xl text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Shopping</h3>
              <p className="text-lg">Let us handle your grocery or shopping list and deliver it straight to you.</p>
            </div>
            {/* Package Delivery */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <FaBox className="text-4xl text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Package Delivery</h3>
              <p className="text-lg">We can pick up and deliver packages to your door—hassle-free.</p>
            </div>
          </div>
        </div>
        <p className='mt-4'>Let us handle your errands and make your life easier! <button className='p-1 bg-sky-600 text-white font-medium rounded-md transform hover:scale-105 transition-transform duration-300'>sign up now</button> </p>
      </section>

      {/* Features Section */}
      <section id="features" className="py-10 bg-gray-100 text-center px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl mb-8">Key Features</h2>
          <div className="flex flex-wrap justify-around gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <FaCheckCircle className="text-4xl text-blue-600 mb-4 mx-auto" />
              <h3 className="text-2xl mb-2 font-bold">Task Management</h3>
              <p className="text-lg">Manage and track your errands with ease.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <FaClock className="text-4xl text-blue-600 mb-4 mx-auto" />
              <h3 className="text-2xl mb-2 font-bold">24/7 Service</h3>
              <p className="text-lg">Get instant assistance for your tasks anytime.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <FaBullhorn className="text-4xl text-blue-600 mb-4 mx-auto" />
              <h3 className="text-2xl mb-2 font-bold">Priority Scheduling</h3>
              <p className="text-lg">Get runners assigned based on the priorities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-blue-600 text-white text-center px-4">
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
              <a href="signup" className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">Start Now</a>
            </div>

            {/* Basic Plan */}
            <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg max-w-xs transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <h3 className="text-2xl mb-4 font-bold">Basic</h3>
              <p className="text-2xl mb-6 font-semibold text-teal-600">Kes 3,500/Month</p>
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
              <a href="#" className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">Subscribe</a>
            </div>

            {/* Premium Plan */}
            <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg max-w-xs transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <h3 className="text-2xl mb-4 font-bold">Premium</h3>
              <p className="text-2xl mb-6 font-semibold text-teal-600">Kes 7,500/Month</p>
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
              <a href="#" className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">Subscribe</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-100 text-center px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl mb-8">What Our Customers Say</h2>
          <div className="flex flex-wrap justify-around gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <FaUserAlt className="text-4xl text-blue-600 mb-4 mx-auto" />
              <p className="text-lg italic mb-4">"ErrandsPal has been a game changer for my busy life. It makes managing my errands so easy!"</p>
              <h3 className="text-xl font-bold">John Doe</h3>
              <div className="text-yellow-500">
                <FaStar className="inline-block" />
                <FaStar className="inline-block" />
                <FaStar className="inline-block" />
                <FaStar className="inline-block" />
                <FaStar className="inline-block" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <FaUserAlt className="text-4xl text-blue-600 mb-4 mx-auto" />
              <p className="text-lg italic mb-4">"The task tracking feature is so convenient. I love being able to monitor my errands!"</p>
              <h3 className="text-xl font-bold">Jane Smith</h3>
              <div className="text-yellow-500">
                <FaStar className="inline-block" />
                <FaStar className="inline-block" />
                <FaStar className="inline-block" />
                <FaStar className="inline-block" />
                <FaStar className="inline-block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white text-center px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl mb-8">Contact Us</h2>
          <p className="text-lg mb-6">We'd love to hear from you! Whether you have a question or need support, 
            our team is ready to help.</p>
          <form action="#" method="POST" className="max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-left text-lg font-medium mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-left text-lg font-medium mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-left text-lg font-medium mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Write your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 ErrandsPal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
