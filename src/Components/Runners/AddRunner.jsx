import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
const AddRunner = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "runner",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const { name, email, phone, role } = formData;

            // Validate required fields
            if (!name || !email || !phone) {
                setError("All fields are required.");
                setLoading(false);
                return;
            }

            // Generate password from name
            const trimmedName = name.trim().split(" ")[0];
            const password = `${trimmedName.toLowerCase()}@errandspal`;

            // Make API request to register user
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password,
                phone,
                role,
            });

            setSuccess(response.data.message);
            setFormData({
                name: "",
                email: "",
                phone: "",
                role: "runner",
            });
        } catch (err) {
            setError(
                err.response?.data?.message || "An error occurred. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={` inset-0 border rounded mb-2 flex justify-center items-center ${isOpen ? "block" : "hidden"
            }`}>
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-center text-blue-500 mb-4">
                        Add Task Runner
                    </h1>
                    <button onClick={onClose} className="text-red-500 hover:text-red-700">
                        <FaTimes className="text-2xl" />
                    </button>
                </div>


                {error && (
                    <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-100 text-green-700 p-2 mb-4 rounded text-sm">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter name"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter email"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter phone number"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="runner">Runner</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
                    >
                        {loading ? "Adding..." : "Add Runner"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddRunner;
