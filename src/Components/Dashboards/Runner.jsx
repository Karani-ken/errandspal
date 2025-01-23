import React from "react";
import { FaTasks, FaCheckCircle, FaTimesCircle, FaClipboardList } from "react-icons/fa";

const Runner = () => {
  const tasks = {
    assigned: [
      { id: 1, title: "Buy groceries", details: "Buy milk and bread." },
      { id: 2, title: "Pick up laundry", details: "From ABC Cleaners." },
    ],
    completed: [
      { id: 3, title: "Deliver package", details: "To Mr. Smith." },
    ],
    notCompleted: [
      { id: 4, title: "Fix printer", details: "Replace toner cartridge." },
    ],
  };

  const totalTasks = tasks.assigned.length + tasks.completed.length + tasks.notCompleted.length;

  return (
    <div className="min-h-screen bg-white text-blue-500 p-6">
      <h1 className="text-3xl font-bold mb-6">Runner Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
            <h3 className="text-lg font-bold">Assigned Tasks</h3>
            <p className="text-2xl">{tasks.assigned.length}</p>
          </div>
        </div>
        <div className="bg-green-500 text-white p-6 rounded shadow flex items-center">
          <FaCheckCircle className="text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-bold">Completed Tasks</h3>
            <p className="text-2xl">{tasks.completed.length}</p>
          </div>
        </div>
        <div className="bg-red-500 text-white p-6 rounded shadow flex items-center">
          <FaTimesCircle className="text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-bold">Not Completed</h3>
            <p className="text-2xl">{tasks.notCompleted.length}</p>
          </div>
        </div>
      </div>

      {/* Task Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white border border-blue-500 p-4 rounded shadow">
          <h2 className="text-xl font-bold">Assigned Tasks</h2>
          <p className="text-slate-400 text-sm">Total: {tasks.assigned.length}</p>
          <div className="mt-4 space-y-2">
            {tasks.assigned.map((task) => (
              <div
                key={task.id}
                className="bg-teal-400 text-white p-2 rounded shadow-sm"
              >
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-sm">{task.details}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-green-500 p-4 rounded shadow">
          <h2 className="text-xl font-bold">Completed Tasks</h2>
          <p className="text-slate-400 text-sm">Total: {tasks.completed.length}</p>
          <div className="mt-4 space-y-2">
            {tasks.completed.map((task) => (
              <div
                key={task.id}
                className="bg-green-500 text-white p-2 rounded shadow-sm"
              >
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-sm">{task.details}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-red-500 p-4 rounded shadow">
          <h2 className="text-xl font-bold">Not Completed</h2>
          <p className="text-slate-400 text-sm">Total: {tasks.notCompleted.length}</p>
          <div className="mt-4 space-y-2">
            {tasks.notCompleted.map((task) => (
              <div
                key={task.id}
                className="bg-red-500 text-white p-2 rounded shadow-sm"
              >
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-sm">{task.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Runner;
