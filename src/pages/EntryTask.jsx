import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useTaskStore from "../store/taskStore";

const EntryTask = ({ isEditMode }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Changed from taskId to id

  const { createTask, updateTask, fetchTaskById, taskDetail, isLoading, clearTaskDetail } =
    useTaskStore();

  const [formData, setFormData] = useState({
    title: "",
    deadline: "",
    priority: "Medium",
  });

  const [errors, setErrors] = useState({});

  // Load task data if in edit mode
  useEffect(() => {
    // Check if id exists before fetching
    if (isEditMode && id) { // Changed taskId to id
      fetchTaskById(id) // Changed taskId to id
        .then((task) => {
          setFormData({
            title: task.title,
            deadline: task.deadline ? task.deadline.split("T")[0] : "",
            priority: task.priority,
          });
        })
        .catch((error) => {
          console.error("Failed to fetch task:", error);
          alert("Failed to load task data");
          navigate("/task");
        });
    }

    return () => {
      clearTaskDetail();
    };
  }, [id, isEditMode, fetchTaskById, clearTaskDetail, navigate]); // Changed taskId to id

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required";
    }

    if (!formData.priority) {
      newErrors.priority = "Priority is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isEditMode) {
        await updateTask(id, formData); // Changed taskId to id
        alert("Task updated successfully!");
      } else {
        await createTask(formData);
        alert("Task created successfully!");
      }
      navigate("/task");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save task");
    }
  };

  const handleCancel = () => {
    navigate("/task");
  };

  // Show loading while fetching task data in edit mode
  if (isEditMode && isLoading && !formData.title) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading task data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">
          {isEditMode ? "Edit Task" : "Create New Task"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Deadline Field */}
          <div>
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Deadline <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.deadline
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.deadline && (
              <p className="mt-1 text-sm text-red-500">{errors.deadline}</p>
            )}
          </div>

          {/* Priority Field */}
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.priority
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {errors.priority && (
              <p className="mt-1 text-sm text-red-500">{errors.priority}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {isLoading
                ? "Saving..."
                : isEditMode
                ? "Update Task"
                : "Create Task"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntryTask;