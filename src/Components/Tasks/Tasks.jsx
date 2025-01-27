import React, { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Ensure proper import

const Task = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [userId, setUserId] = useState(null);
    const [role, setRole] = useState(null);

    // Extract userId and role from token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.id);
                setRole(decodedToken.role); // Assuming the token contains a `role` field
            } catch (error) {
                console.error('Invalid token', error);
            }
        }
    }, []);

    // Fetch tasks based on role
    const { data, isLoading, error } = useQuery({
        queryKey: ['tasks', role, userId],
        queryFn: async () => {
            let url;
            if (role === 'admin') {
                url = `${apiUrl}/api/tasks/all`; // Admin sees all tasks
            } else if (role === 'runner') {
                url = `${apiUrl}/api/tasks/runner/${userId}`; // Runner sees assigned tasks
            } else {
                url = `${apiUrl}/api/tasks/user/${userId}`; // Other roles see their tasks
            }
            const response = await axios.get(url);
            return response?.data?.tasks || []; // Return the tasks array
        },
        enabled: !!role && !!userId, // Enable query only if role and userId are set
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) {
        return <p>Loading tasks...</p>;
    }

    if (error) {
        return <p className="text-red-500">Failed to fetch tasks: {error.message}</p>;
    }

    // Ensure data is available and is an array before rendering the tasks
    if (!Array.isArray(data) || data.length === 0) {
        return <p>No tasks found</p>;
    }

    return (
        <div className="p-3">
            <h1 className="text-md md:text-2xl font-bold">Task List</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20 lg:grid-cols-3 mt-3">
                {data.map((task) => (
                    <TaskCard key={task._id} {...task} />
                ))}
            </div>
        </div>
    );
};

export default Task;
