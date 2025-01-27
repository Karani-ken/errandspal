import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { FaBars, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Menubar = ({ toggleSideBar, setToggleSideBar }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [user, setUser] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [loadingSubscription, setLoadingSubscription] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  function formatDate(date) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const username = decoded.username;
        const userId = decoded.id; // Assuming userId is in the token
        setUser(username);

        fetchSubscriptionStatus(userId);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const fetchSubscriptionStatus = async (userId) => {
    try {
      setLoadingSubscription(true);
      const response = await axios.get(`${apiUrl}/api/subscriptions/user/${userId}`);
      setSubscription(response.data.data[1].planName || "Pay-As-You-Go");
    } catch (error) {
      console.error("Failed to fetch subscription status:", error);
      setSubscription("Pay-As-You-Go");
    } finally {
      setLoadingSubscription(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-10 p-1">
      {/* Navbar Top Section */}
      <div className="grid md:grid-cols-5 items-center px-2 py-1">
        {/* Logo and Sidebar Toggle */}
        <div className="col-span-1 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-800">ErrandsPal</h1>
          <FaBars
            className="text-teal-500 text-2xl cursor-pointer "
            onClick={() => setToggleSideBar(!toggleSideBar)}
          />
        </div>

        {/* Date and Search Bar */}
        <div className="col-span-3 hidden md:flex items-center justify-center">
          <p className="text-gray-600 font-medium">{formatDate(new Date())}</p>
          {isSearchVisible && (
            <input
              type="text"
              placeholder="Search..."
              className="ml-4 border border-gray-300 rounded-lg px-3 py-1 w-1/2 focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          )}
          <CiSearch
            className="cursor-pointer text-gray-600 text-xl ml-4 hover:text-teal-500"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          />
        </div>
      </div>

      {/* User Info and Actions */}
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 px-4 py-4 bg-gray-100 rounded-lg">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="bg-teal-100 p-3 rounded-full">
            <FaUserAlt className="text-teal-600 text-2xl" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">{user}</h1>
            {!loadingSubscription && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Plan:</span> {subscription}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {!loadingSubscription && subscription === "Pay-As-You-Go" && (
            <Link to='/plans' className="bg-blue-500 text-white py-2 px-5 rounded-lg shadow hover:bg-blue-600 transition">
              Upgrade Subscription
            </Link>
          )}
          <button
            onClick={logOut}
            className="flex items-center justify-center bg-red-500 text-white py-2 px-5 rounded-lg shadow hover:bg-red-600 transition"
          >
            <FaSignOutAlt className="mr-2" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menubar;
