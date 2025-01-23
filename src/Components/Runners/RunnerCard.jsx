import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaPhone, FaEnvelope, FaTasks, FaCheckCircle } from "react-icons/fa";

// Fetch tasks for a specific runner
const fetchRunnerTasks = async (runnerId) => {
  const response = await axios.get(`http://localhost:5000/api/tasks/runner/${runnerId}`);
  return response.data.tasks; // Return the tasks array
};

const RunnerCard = ({ runnerId, name, phone, email }) => {
  // Use React Query to fetch tasks for this runner
  const { data: tasks = [], isLoading, isError, error } = useQuery({
    queryKey: ["runnerTasks", runnerId],
    queryFn: () => fetchRunnerTasks(runnerId),
  });

  if (isLoading) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full sm:w-80 md:w-96 lg:w-96 mx-auto mb-6">
        Loading tasks...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 p-6 rounded-lg shadow-md w-full sm:w-80 md:w-96 lg:w-96 mx-auto mb-6">
        Error: {error.message}
      </div>
    );
  }

  // Calculate task statistics
  const totalTasks = tasks.length;
  const activeTasks = tasks.filter((task) => task.status === "in_progress").length;
  const completedTasks = tasks.filter((task) => task.status === "completed").length;

  // Handle case where no tasks are assigned
  if (totalTasks === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 w-full sm:w-80 md:w-96 lg:w-96 mx-auto mb-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="flex items-center mb-2 text-gray-600">
          <FaPhone className="mr-2" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center mb-2 text-gray-600">
          <FaEnvelope className="mr-2" />
          <span>{email}</span>
        </div>
        <div className="mt-4 text-gray-600">
          No tasks assigned to this runner yet.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full sm:w-80 md:w-96 lg:w-96 mx-auto mb-6">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <div className="flex items-center mb-2 text-gray-600">
        <FaPhone className="mr-2" />
        <span>{phone}</span>
      </div>
      <div className="flex items-center mb-2 text-gray-600">
        <FaEnvelope className="mr-2" />
        <span>{email}</span>
      </div>
      <div className="flex justify-between text-gray-700 mt-4">
        <div>
          <div className="font-semibold">Total Tasks</div>
          <div className="flex items-center">
            <FaTasks className="mr-2" />
            {totalTasks}
          </div>
        </div>
        <div>
          <div className="font-semibold">Active Tasks</div>
          <div className="flex items-center text-yellow-600">
            <FaTasks className="mr-2" />
            {activeTasks}
          </div>
        </div>
        <div>
          <div className="font-semibold">Completed Tasks</div>
          <div className="flex items-center text-green-600">
            <FaCheckCircle className="mr-2" />
            {completedTasks}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunnerCard;
