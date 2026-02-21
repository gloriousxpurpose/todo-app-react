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
    clearStore,
  } = useTaskStore();

  const { currentUser, logout } = useAuthStore();

  // Fetch tasks on mount and when user changes
  useEffect(() => {
    if (currentUser) {
      fetchTasks();
    }

    // Cleanup: clear tasks when user changes or component unmounts
    return () => {
      clearStore();
    };
  }, [currentUser?.userId]);

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
    if (window.confirm("Are you sure you want to delete this task?")) {
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
        return "bg-red-100 text-red-700 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const completedCount = tasks.filter((t) => t.is_done).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with User Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-2 mb-6">
          <div className="flex flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {currentUser?.fullName?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>

                <p className="font-bold text-gray-800 text-lg">
                  {currentUser?.fullName || "User"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline ">Logout</span>
            </button>
          </div>
        </div>

        {/* Task Management Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Task Management
            </h1>
            <p className="text-gray-600 mt-1">
              Organize your tasks efficiently
              {totalCount > 0 && (
                <span className="ml-2 text-xs font-medium text-slate-400">
                  — {completedCount}/{totalCount} completed
                </span>
              )}
            </p>
          </div>
          <button
            onClick={() => navigate("entry")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Task
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="lg:col-span-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-12 pr-24 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Priority Filter */}
            <div className="lg:col-span-4 flex gap-2">
              {[
                { value: "High", label: "High", color: "from-red-500 to-red-600" },
                { value: "Medium", label: "Medium", color: "from-yellow-500 to-yellow-600" },
                { value: "Low", label: "Low", color: "from-green-500 to-green-600" },
              ].map((priority) => (
                <button
                  key={priority.value}
                  onClick={() => handlePriorityFilter(priority.value)}
                  className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${filters.priority === priority.value
                    ? `bg-gradient-to-r ${priority.color} text-white shadow-lg transform scale-105`
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                    }`}
                >
                  {priority.label}
                </button>
              ))}
            </div>

            {/* Sort & Clear */}
            <div className="lg:col-span-3 flex gap-2">
              <button
                onClick={handleSortOrder}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={filters.sortOrder === "desc" ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
                </svg>
                {filters.sortOrder === "desc" ? "Newest" : "Oldest"}
              </button>
              <button
                onClick={clearFilters}
                className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 transition-all"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {isError && (
          <div className="bg-red-50 border-2 border-red-200 text-red-800 px-6 py-4 rounded-xl mb-6 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
            <button onClick={clearError} className="text-red-800 hover:text-red-900 font-bold text-xl">
              ×
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16">
            <div className="inline-block relative">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="mt-6 text-gray-600 font-medium text-lg">Loading tasks...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && tasks.length === 0 && (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-xl font-medium mb-4">No tasks found</p>
            <button
              onClick={() => navigate("entry")}
              className="text-indigo-600 hover:text-indigo-700 font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create your first task
            </button>
          </div>
        )}

        {/* Tasks List */}
        {!isLoading && tasks.length > 0 && (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <div
                key={task.task_id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <div className="pt-1">
                    <input
                      type="checkbox"
                      checked={task.is_done || false}
                      onChange={(e) => handleCheckboxChange(task.task_id, e.target.checked)}
                      className="w-6 h-6 text-indigo-600 rounded-lg focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-all"
                    />
                  </div>

                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <h3
                          className={`text-xl font-bold mb-3 ${task.is_done
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                            }`}
                        >
                          {task.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                          {task.is_done && (
                            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-100 text-green-700 border border-green-200 flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Completed
                            </span>
                          )}
                        </div>

                        {/* Task Metadata */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">Deadline:</span> {formatDate(task.deadline)}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">Created:</span> {formatDate(task.created_at)}
                          </div>
                          {task.completed_at && (
                            <div className="flex items-center gap-2 text-gray-600 sm:col-span-2">
                              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="font-medium">Completed:</span> {formatDate(task.completed_at)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex lg:flex-col gap-2">
                        <button
                          onClick={() => navigate(`update/${task.task_id}`)}
                          className="flex-1 lg:flex-none bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task.task_id)}
                          className="flex-1 lg:flex-none bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;