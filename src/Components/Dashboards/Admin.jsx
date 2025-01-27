import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaTasks, FaUserPlus, FaClipboardCheck } from "react-icons/fa";
import AddRunner from "../Runners/AddRunner";

const apiUrl = import.meta.env.VITE_API_URL;
// Function to fetch tasks
const fetchTasks = async () => {
  const response = await axios.get(`${apiUrl}/api/tasks/all`);
  const tasks = response?.data?.data || [] ;

  // Categorize tasks based on their status
  return {
    new: tasks.filter((task) => task.status === "pending"),
    inProgress: tasks.filter((task) => task.status === "in_progress"),
    completed: tasks.filter((task) => task.status === "complete"),
  };
};

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Use React Query to fetch and cache errands
  const { data: errands = {}, isLoading, isError, error } = useQuery({
    queryKey: ["tasks"], // Query key for caching
    queryFn: fetchTasks, // Function to fetch tasks
    staleTime: 5 * 60 * 1000, // 5 minutes stale time
    cacheTime: 10 * 60 * 1000, // 10 minutes cache time
  });
  

  const handleOpenAddRunner = () => setIsOpen(true);
  const handleCloseAddRunner = () => setIsOpen(false);

  if (isLoading) {
    return <p className="text-center text-blue-500">Loading tasks...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">{error.message}</p>;
  }

  return (
    <div className="min-h-screen bg-white text-blue-500 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded shadow flex items-center">
          <FaTasks className="text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-bold">New Errands</h3>
            <p className="text-2xl">{errands.new?.length || 0}</p>
          </div>
        </div>
        <div className="bg-teal-400 text-white p-6 rounded shadow flex items-center">
          <FaClipboardCheck className="text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-bold">In Progress</h3>
            <p className="text-2xl">{errands.inProgress?.length || 0}</p>
          </div>
        </div>
        <div className="bg-slate-400 text-white p-6 rounded shadow flex items-center">
          <FaClipboardCheck className="text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-bold">Completed</h3>
            <p className="text-2xl">{errands.completed?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Task Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white border border-blue-500 p-4 rounded shadow">
          <h2 className="text-xl font-bold">New Errands</h2>
          <p className="text-slate-400 text-sm">Total: {errands.new?.length || 0}</p>
          <div className="mt-4 space-y-2">
            {errands.new?.map((task) => (
              <div
                key={task._id}
                className="bg-teal-400 text-white p-2 rounded shadow-sm"
              >
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-blue-500 p-4 rounded shadow">
          <h2 className="text-xl font-bold">In Progress</h2>
          <p className="text-slate-400 text-sm">Total: {errands.inProgress?.length || 0}</p>
          <div className="mt-4 space-y-2">
            {errands.inProgress?.map((task) => (
              <div
                key={task._id}
                className="bg-teal-400 text-white p-2 rounded shadow-sm"
              >
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-blue-500 p-4 rounded shadow">
          <h2 className="text-xl font-bold">Completed</h2>
          <p className="text-slate-400 text-sm">Total: {errands.completed?.length || 0}</p>
          <div className="mt-4 space-y-2">
            {errands.completed?.map((task) => (
              <div
                key={task._id}
                className="bg-teal-400 text-white p-2 rounded shadow-sm"
              >
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Runners Section */}
      <div className="mt-10 text-center">
        <button
          onClick={handleOpenAddRunner}
          className="bg-blue-500 text-white py-3 px-6 rounded shadow inline-flex items-center"
        >
          <FaUserPlus className="mr-2" /> Add Runners
        </button>
        <AddRunner isOpen={isOpen} onClose={handleCloseAddRunner} />
      </div>
    </div>
  );
};

export default Admin;
