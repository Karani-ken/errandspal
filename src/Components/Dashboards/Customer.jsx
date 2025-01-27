import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query"; // Import React Query's `useQuery`
import { FaTasks, FaCheckCircle, FaClipboardList, FaPlusCircle } from "react-icons/fa";
import AddTaskForm from "../Tasks/AddTaskForm";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Corrected import

const Customer = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  // Extract `userId` from the token in local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode token
        
        setUserId(decodedToken.id); // Set `userId` from decoded token
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []); // Runs only on component mount

  // Fetch tasks using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks", userId], // Query key
    queryFn: async () => {
      const response = await axios.get(
        `${apiUrl}/api/tasks/user/${userId}`
      );
      return response.data.data; // Return the tasks array
    },
    enabled: !!userId, // Enable the query only if userId is available
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
  
  // Logic to separate tasks by status
  const inProgressTasks = data?.filter((task) => task.status === "in_progress") || [];
  const completedTasks = data?.filter((task) => task.status === "complete") || [];

  const handleOpenAddTask = () => setIsOpen(true);
  const handleCloseAddTask = () => setIsOpen(false);

  const totalTasks = inProgressTasks.length + completedTasks.length;

  return (
    <div className="min-h-screen bg-white text-blue-500 p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded shadow flex items-center">
          <FaClipboardList className="text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-bold">Total Tasks</h3>
            <p className="text-2xl">{totalTasks}</p>
          </div>
        </div>
        <div className="bg-teal-400 text-white p-6 rounded shadow flex items-center">
          <FaTasks className="text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-bold">In Progress</h3>
            <p className="text-2xl">{inProgressTasks.length}</p>
          </div>
        </div>
        <div className="bg-green-500 text-white p-6 rounded shadow flex items-center">
          <FaCheckCircle className="text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-bold">Completed</h3>
            <p className="text-2xl">{completedTasks.length}</p>
          </div>
        </div>
      </div>

      {/* Create Task Section */}
      <div className="mb-8">
        <button
          onClick={handleOpenAddTask}
          className="mt-4 bg-teal-400 text-white py-2 px-6 rounded shadow inline-flex items-center"
        >
          <FaPlusCircle className="mr-2" /> Add Task
        </button>
      </div>

      <AddTaskForm isOpen={isOpen} onClose={handleCloseAddTask} />

      {/* Task Cards Section */}
      {isLoading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">Failed to fetch tasks: {error.message}</p>}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* In Progress Tasks */}
          <div className="bg-white border border-teal-400 p-4 rounded shadow">
            <h2 className="text-xl font-bold">In Progress Tasks</h2>
            <p className="text-slate-400 text-sm">Total: {inProgressTasks.length}</p>
            <div className="mt-4 space-y-2">
              {inProgressTasks.map((task) => (
                <div key={task._id} className="bg-teal-400 text-white p-2 rounded shadow-sm">
                  <h3 className="font-bold">{task.title}</h3>
                  <p className="text-sm">{task.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="bg-white border border-green-500 p-4 rounded shadow">
            <h2 className="text-xl font-bold">Completed Tasks</h2>
            <p className="text-slate-400 text-sm">Total: {completedTasks.length}</p>
            <div className="mt-4 space-y-2">
              {completedTasks.map((task) => (
                <div key={task._id} className="bg-green-500 text-white p-2 rounded shadow-sm">
                  <h3 className="font-bold">{task.title}</h3>
                  <p className="text-sm">{task.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
