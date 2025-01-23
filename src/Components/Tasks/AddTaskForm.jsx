import React, { useState } from "react";
import { FaTasks, FaLocationArrow, FaRegClock, FaRegSave, FaTimes } from "react-icons/fa";

const AddTaskForm = ({ isOpen, onClose }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({   
    title: "",
    description: "",
    category: "",
    priority: "",
    scheduledTime: "",
    pickupLocation: "",
    dropoffLocation: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category) {
      alert("Please fill in the required fields: User ID, Title, and Category.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${apiUrl}/api/tasks/add`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });     

      const result = await response.json();

      if (response.ok) {
        alert("Task added successfully!");
        setFormData({        
          title: "",
          description: "",
          category: "",
          priority: "",
          scheduledTime: "",
          pickupLocation: "",
          dropoffLocation: "",
        });
        onClose(); // Close the form after submission
      } else {
        alert(result.message || "Failed to add task.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("An error occurred while adding the task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={` inset-0 border rounded mb-2 flex justify-center items-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex items-center">
            <FaTasks className="mr-2 text-blue-500" /> Add New Task
          </h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-700">
            <FaTimes className="text-2xl" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Fields */}
         
          <div>
            <label className="block font-semibold">Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter Task Title"
            />
          </div>
          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter Task Description"
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold">Category*</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter Task Category"
            />
          </div>
          <div>
            <label className="block font-semibold">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold flex items-center">
              <FaRegClock className="mr-2 text-gray-500" /> Scheduled Time
            </label>
            <input
              type="datetime-local"
              name="scheduledTime"
              value={formData.scheduledTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold flex items-center">
              <FaLocationArrow className="mr-2 text-gray-500" /> Pickup Location
            </label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter Pickup Location"
            />
          </div>
          <div>
            <label className="block font-semibold flex items-center">
              <FaLocationArrow className="mr-2 text-gray-500" /> Dropoff Location
            </label>
            <input
              type="text"
              name="dropoffLocation"
              value={formData.dropoffLocation}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter Dropoff Location"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-bold rounded-lg flex items-center justify-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span>Saving...</span>
            ) : (
              <>
                <FaRegSave className="mr-2" /> Save Task
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
