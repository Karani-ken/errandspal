import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTasks, FaCheckCircle, FaTimesCircle, FaClipboardList } from "react-icons/fa";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Corrected capitalization

const Runner = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [runnerId, setRunnerId] = useState(null);

  // Extract `runnerId` from the token in local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRunnerId(decodedToken.id); // Set runnerId from decoded token
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  // Fetch tasks assigned to the runner
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks", runnerId],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/api/tasks/runner/${runnerId}`);
      return response.data.tasks; // Adjust based on API response structure
    },
    enabled: !!runnerId, // Only fetch if `runnerId` is available
    staleTime: 5 * 60 * 1000,
  });

  // Categorize tasks by status
  const assignedTasks = data?.filter((task) => task.status === "in_progress") || [];
  const completedTasks = data?.filter((task) => task.status === "complete") || [];
  const notCompletedTasks = data?.filter((task) => task.status === "in_progress") || [];
  

  return (
    <div className="min-h-screen bg-white text-blue-500 p-6">
      <h1 className="text-3xl font-bold mb-6">Runner Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-teal-400 text-white p-6 rounded shadow flex items-center">
          <FaTasks className="text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-bold">Assigned Tasks</h3>
            <p className="text-2xl">{assignedTasks.length}</p>
          </div>
        </div>
        <div className="bg-green-500 text-white p-6 rounded shadow flex items-center">
          <FaCheckCircle className="text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-bold">Completed Tasks</h3>
            <p className="text-2xl">{completedTasks.length}</p>
          </div>
        </div>
        <div className="bg-red-500 text-white p-6 rounded shadow flex items-center">
          <FaTimesCircle className="text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-bold">Not Completed</h3>
            <p className="text-2xl">{notCompletedTasks.length}</p>
          </div>
        </div>
      </div>

      {/* Task Cards Section */}
      {isLoading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">Failed to fetch tasks: {error.message}</p>}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Assigned Tasks */}
          <div className="bg-white border border-teal-400 p-4 rounded shadow">
            <h2 className="text-xl font-bold">Assigned Tasks</h2>
            <p className="text-slate-400 text-sm">Total: {assignedTasks.length}</p>
            <div className="mt-4 space-y-2">
              {assignedTasks.map((task) => (
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

          {/* Not Completed Tasks */}
          <div className="bg-white border border-red-500 p-4 rounded shadow">
            <h2 className="text-xl font-bold">Not Completed Tasks</h2>
            <p className="text-slate-400 text-sm">Total: {notCompletedTasks.length}</p>
            <div className="mt-4 space-y-2">
              {notCompletedTasks.map((task) => (
                <div key={task._id} className="bg-red-500 text-white p-2 rounded shadow-sm">
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

export default Runner;
