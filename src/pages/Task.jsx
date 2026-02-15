import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useTaskStore from "../store/taskStore";
import useAuthStore from "../store/userStore";

const Task = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const {
    tasks,
    filters,
    setFilters,
    fetchTasks,
    updateTaskStatus,
    deleteTask,
    isLoading,
    isError,
    error,
    clearError,
  } = useTaskStore();

  const { currentUser, logout } = useAuthStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    fetchTasks(filters);
  }, [filters]);

  const handleCheckboxChange = async (taskId, checked) => {
    try {
      await updateTaskStatus(taskId, { is_done: checked });
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus task ini?")) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ search: searchInput });
  };

  const handlePriorityFilter = (priority) => {
    setFilters({ priority: priority === filters.priority ? "" : priority });
  };

  const handleSortOrder = () => {
    setFilters({ sortOrder: filters.sortOrder === "desc" ? "asc" : "desc" });
  };

  const clearFilters = () => {
    setSearchInput("");
    setFilters({ priority: "", sortOrder: "desc", search: "" });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header with User Info and Logout */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {currentUser?.fullName?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="font-semibold text-gray-800">
                {currentUser?.fullName || "User"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Task Management Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <button
          onClick={() => navigate("entry")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          + Create Task
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="md:col-span-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                Search
              </button>
            </div>
          </form>

          {/* Priority Filter */}
          <div className="flex gap-2">
            {["High", "Medium", "Low"].map((priority) => (
              <button
                key={priority}
                onClick={() => handlePriorityFilter(priority)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.priority === priority
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {priority}
              </button>
            ))}
          </div>

          {/* Sort & Clear */}
          <div className="flex gap-2">
            <button
              onClick={handleSortOrder}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm"
            >
              {filters.sortOrder === "desc" ? "↓ Newest" : "↑ Oldest"}
            </button>
            <button
              onClick={clearFilters}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={clearError} className="text-red-700 font-bold">
            ×
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && tasks.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">No tasks found</p>
          <button
            onClick={() => navigate("entry")}
            className="mt-4 text-blue-600 hover:underline"
          >
            Create your first task
          </button>
        </div>
      )}

      {/* Tasks List */}
      {!isLoading && tasks.length > 0 && (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.task_id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={task.is_done || false}
                  onChange={(e) =>
                    handleCheckboxChange(task.task_id, e.target.checked)
                  }
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />

                {/* Task Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        className={`text-xl font-semibold ${
                          task.is_done
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </h3>
                      <div className="flex gap-2 mt-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                        {task.is_done && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ✓ Completed
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`update/${task.task_id}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.task_id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Task Metadata */}
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Deadline:</span>{" "}
                      {formatDate(task.deadline)}
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>{" "}
                      {formatDate(task.created_at)}
                    </div>
                    {task.completed_at && (
                      <div className="col-span-2">
                        <span className="font-medium">Completed:</span>{" "}
                        {formatDate(task.completed_at)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Task;