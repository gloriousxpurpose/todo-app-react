import { create } from "zustand";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../services/api/task";

const useTaskStore = create((set, get) => ({
  tasks: [],
  taskDetail: null,
  isLoading: false,
  isError: false,
  error: null,
  filters: {
    priority: "",
    sortOrder: "desc",
    search: "",
  },

  // Set filters
  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
  },

  // Fetch all tasks with filters
  fetchTasks: async (customFilters) => {
    set({ isLoading: true, isError: false, error: null });
    try {
      const filters = customFilters || get().filters;

      // Remove empty filter values
      const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {});

      const data = await getAllTasks(cleanFilters);
      set({ tasks: data, isLoading: false });
    } catch (err) {
      set({
        isLoading: false,
        isError: true,
        error: err.response?.data?.message || "Failed to fetch tasks"
      });
    }
  },

  // Fetch task by ID
  fetchTaskById: async (id) => {
    set({ isLoading: true, isError: false, error: null });
    try {
      const data = await getTaskById(id);
      set({ taskDetail: data, isLoading: false });
      return data;
    } catch (err) {
      set({
        isLoading: false,
        isError: true,
        error: err.response?.data?.message || "Failed to fetch task"
      });
      throw err;
    }
  },

  // Create new task
  createTask: async (payload) => {
    set({ isLoading: true, isError: false, error: null });
    try {
      const newTask = await createTask(payload);
      set({
        tasks: [newTask, ...get().tasks],
        isLoading: false
      });
      return newTask;
    } catch (err) {
      set({
        isLoading: false,
        isError: true,
        error: err.response?.data?.message || "Failed to create task"
      });
      throw err;
    }
  },

  // Update task
  updateTask: async (id, payload) => {
    set({ isLoading: true, isError: false, error: null });
    try {
      const updatedTask = await updateTask(id, payload);
      set({
        tasks: get().tasks.map((task) =>
          task.task_id === id ? { ...task, ...updatedTask } : task
        ),
        taskDetail: get().taskDetail?.task_id === id
          ? { ...get().taskDetail, ...updatedTask }
          : get().taskDetail,
        isLoading: false,
      });
      return updatedTask;
    } catch (err) {
      set({
        isLoading: false,
        isError: true,
        error: err.response?.data?.message || "Failed to update task"
      });
      throw err;
    }
  },

  // Update task status (optimistic update)
  updateTaskStatus: async (id, payload) => {
    // Optimistically update UI first
    set({
      tasks: get().tasks.map((task) =>
        task.task_id === id
          ? {
            ...task,
            is_done: payload.is_done,
            completed_at: payload.is_done ? new Date().toISOString() : null
          }
          : task
      ),
    });

    try {
      const updated = await updateTaskStatus(id, payload);
      const updatedTask = updated.updatedData[0];

      // Update with server response
      set({
        tasks: get().tasks.map((task) =>
          task.task_id === updatedTask.task_id ? updatedTask : task
        ),
      });
      return updatedTask;
    } catch (err) {
      // Revert on error
      set({ isError: true, error: err.response?.data?.message || "Failed to update status" });
      get().fetchTasks(); // Refetch to get correct state
      throw err;
    }
  },

  // Delete task
  deleteTask: async (id) => {
    set({ isLoading: true, isError: false, error: null });
    try {
      await deleteTask(id);
      set({
        tasks: get().tasks.filter((task) => task.task_id !== id),
        isLoading: false,
      });
    } catch (err) {
      set({
        isLoading: false,
        isError: true,
        error: err.response?.data?.message || "Failed to delete task"
      });
      throw err;
    }
  },

  // Clear task detail
  clearTaskDetail: () => {
    set({ taskDetail: null });
  },

  // Clear error
  clearError: () => {
    set({ isError: false, error: null });
  },

  // Clear entire store (for logout)
  clearStore: () => {
    set({
      tasks: [],
      taskDetail: null,
      isLoading: false,
      isError: false,
      error: null,
      filters: {
        priority: "",
        sortOrder: "desc",
        search: "",
      },
    });
  },
}));

export default useTaskStore;