import React, { useState } from 'react';
import {FaBars } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';

const Menubar = ({ toggleSideBar, setToggleSideBar }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  function formatDate(date) {
    const options = { weekday: "long", year: "numeric", month: "long", day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className="grid md:grid-cols-5 items-center shadow-md sticky top-0 bg-white z-10 p-3">
      {/* Logo and Sidebar Toggle */}
      <div className="col-span-1 flex items-center justify-between">    
        <h1 className='text-3xl font-black'>ErrandsPal</h1> 
        <FaBars
          className="text-teal-300 text-2xl cursor-pointer"
          onClick={() => setToggleSideBar(!toggleSideBar)}
        />
      </div>

      {/* Date and Search Input */}
      <div className="col-span-3 flex justify-center items-center">
        <p>{formatDate(new Date())}</p>
        {isSearchVisible && (
          <input
            type="text"
            placeholder="search"
            className="border border-gray-300 rounded px-2 mx-2"
          />
        )}
        <CiSearch
          className="cursor-pointer text-xl mx-2"
          onClick={() => setIsSearchVisible(!isSearchVisible)}
        />
      </div>
      <h1>Admin</h1>       
    </div>
  );
};

export default Menubar;