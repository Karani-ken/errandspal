import React, { useState } from 'react';
import { MdOutlineDashboard, MdOutlineMessage } from "react-icons/md";
import { FaCalendarCheck, FaUsers } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
// Import the components
import Dashboard from './Dashboard';
import Tasks from '../Tasks/Tasks';
import Subscriptions from '../Subscriptions/Subscriptions';
import RunnersTable from '../Runners/RunnersTable';


const Sidebar = ({ toggleSideBar }) => {
    const [activeMenu, setActiveMenu] = useState('Dashboard');
    const menuItems = [
        { name: 'Dashboard', icon: <MdOutlineDashboard /> },
        { name: 'Runners', icon: <FaUsers /> },       
        { name: 'Tasks', icon: <FaCalendarCheck /> },
        { name: 'Subscriptions', icon: <MdOutlineMessage /> },
        { name: 'Log out', icon: <FaSignOutAlt /> },
    ];

    const ActiveComponent = () => {
        switch (activeMenu) {
            case 'Dashboard':
                return <Dashboard />;
            case 'Tasks':
                return <Tasks />;
            case 'Subscriptions':
                return <Subscriptions />;          
            case 'Runners':
                return <RunnersTable />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`bg-sky-600 h-full w-52 transition-all duration-300 ${toggleSideBar ? 'block' : 'hidden'
                    }`}
            >               
                <ul className="text-teal-300">
                    {menuItems.map((item) => (
                        <li
                            key={item.name}
                            className={`flex items-center my-2 text-xl cursor-pointer p-5 ${activeMenu === item.name
                                    ? 'bg-white text-teal-300'
                                    : 'hover:bg-teal-300 text-white'
                                }`}
                            onClick={() => setActiveMenu(item.name)}
                        >
                            <span className="mx-2">{item.icon}</span> {item.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div
                className={`flex-1 overflow-y-auto bg-gray-100 transition-all duration-300 ${toggleSideBar ? 'ml-0' : 'w-full'
                    }`}
            >
                <ActiveComponent />
            </div>
        </div>
    );
};

export default Sidebar;