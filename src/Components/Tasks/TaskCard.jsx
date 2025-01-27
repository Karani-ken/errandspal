import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUser,
  FaMapMarkerAlt,
  FaClock,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";
import {jwtDecode} from "jwt-decode";

const TaskCard = ({
  _id,
  title,
  description,
  category,
  priority,
  scheduledTime,
  pickupLocation,
  dropoffLocation,
  customerName,
  isRunnerAssigned,
  status,
  assignedRunner,
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [showRunners, setShowRunners] = useState(false);
  const [runners, setRunners] = useState([]);
  const [loadingRunners, setLoadingRunners] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [role, setRole] = useState("");

  // Decode the role from JWT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role); // Assuming `role` is part of the token payload
    }
  }, []);

  // Fetch runners
  const fetchRunners = async () => {
    try {
      setLoadingRunners(true);
      const response = await axios.get(`${apiUrl}/api/auth/users/runner`);
      setRunners(response.data.data);
      setLoadingRunners(false);
      setShowRunners(true);
    } catch (err) {
      setError("Failed to fetch runners. Please try again.");
      setLoadingRunners(false);
    }
  };

  // Assign task to runner
  const assignTask = async (runnerId) => {
    try {
      setAssigning(true);
      const response = await axios.put(`${apiUrl}/api/tasks/assign`, {
        taskId: _id,
        runnerId,
      });
      setSuccess(response.data.message);
      setShowRunners(false);
      setAssigning(false);
    } catch (err) {
      setError("Failed to assign task. Please try again.");
      setAssigning(false);
    }
  };

  // Mark task as complete
  const markAsComplete = async () => {
    try {
      const response = await axios.put(`${apiUrl}/api/tasks/update/status`, {
        taskId: _id,
        status: "complete",
      });
      setSuccess(response.data.message);
    } catch (err) {
      setError("Failed to mark task as complete. Please try again.");
    }
  };

  // Delete task
  const deleteTask = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/api/tasks/delete/${_id}`);
      setSuccess(response.data.message);
    } catch (err) {
      setError("Failed to delete task. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full sm:w-80 md:w-96 lg:w-96 mx-auto mb-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="space-y-4">
        <div className="flex items-center text-gray-700">
          <FaClipboardList className="mr-2" />
          <span className="font-semibold">Category:</span> {category}
        </div>
        <div className="flex items-center text-gray-700">
          <FaCheckCircle className="mr-2" />
          <span className="font-semibold">Priority:</span> {priority}
        </div>
        <div className="flex items-center text-gray-700">
          <FaClock className="mr-2" />
          <span className="font-semibold">Scheduled Time:</span>{" "}
          {scheduledTime}
        </div>
        <div className="flex items-center text-gray-700">
          <FaMapMarkerAlt className="mr-2" />
          <span className="font-semibold">Pickup Location:</span>{" "}
          {pickupLocation}
        </div>
        <div className="flex items-center text-gray-700">
          <FaMapMarkerAlt className="mr-2" />
          <span className="font-semibold">Dropoff Location:</span>{" "}
          {dropoffLocation}
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <div className="flex items-center text-gray-700">
          <FaUser className="mr-2" />
          <span className="font-semibold">Customer:</span> {customerName}
        </div>
        <div className="flex items-center text-gray-700">
          <span className="font-semibold">Assigned Runner:</span>{" "}
          {isRunnerAssigned ? assignedRunner : "No Runner Assigned"}
        </div>
        <div className="flex items-center text-gray-700">
          <span className="font-semibold">Progress:</span> {status}
        </div>
      </div>

      {success && (
        <div className="bg-green-100 text-green-700 p-2 mt-2 rounded text-sm">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mt-2 rounded text-sm">
          {error}
        </div>
      )}

      {/* Admin: Assign Task Button */}
      {role === "admin" && !isRunnerAssigned && (
        <button
          onClick={fetchRunners}
          disabled={loadingRunners || assigning}
          className="text-white bg-sky-600 p-2 font-medium rounded w-full mt-4 hover:bg-sky-700"
        >
          {loadingRunners ? "Loading Runners..." : "Assign Task"}
        </button>
      )}

      {/* Runner: Mark as Complete Button */}
      {role === "runner" && status !== "complete" && (
        <button
          onClick={markAsComplete}
          className="text-white bg-green-600 p-2 font-medium rounded w-full mt-4 hover:bg-green-700"
        >
          Mark as Complete
        </button>
      )}

      {/* Admin/Customer: Delete Task Button */}
      {(role === "admin" || role === "customer") && (
        <button
          onClick={deleteTask}
          className="text-white bg-red-600 p-2 font-medium rounded w-full mt-4 hover:bg-red-700"
        >
          Delete Task
        </button>
      )}

      {/* Runners List Modal */}
      {showRunners && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Select a Runner</h2>
            <ul className="space-y-4">
              {runners.map((runner) => (
                <li
                  key={runner._id}
                  className="flex justify-between items-center p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                  onClick={() => assignTask(runner._id)}
                >
                  <span>{runner.name}</span>
                  <span className="text-gray-500">{runner.email}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowRunners(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
