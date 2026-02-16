import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getUserById, loginUser, createUser, updateUser, getMe } from "../services/api/user";
import useTaskStore from "./taskStore";

const useAuthStore = create(
  persist(
    (set, get) => ({
      currentUser: null,
      token: null,
      isLogin: false,
      loading: false,
      error: null,

      // Login
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await loginUser(credentials);

          if (!response.success) {
            throw new Error(response.message);
          }

          const { token, user } = response.data;

          // Store token in localStorage
          localStorage.setItem("token", token);

          set({
            currentUser: user,
            token: token,
            isLogin: true,
            loading: false,
          });

          return response;
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message || "Login failed";
          set({ loading: false, error: errorMessage, isLogin: false });
          throw errorMessage;
        }
      },

      // Register
      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const response = await createUser(userData);

          if (!response.success) {
            throw new Error(response.message);
          }

          set({ loading: false });
          return response;
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message || "Registration failed";
          set({ loading: false, error: errorMessage });
          throw errorMessage;
        }
      },

      // Get current user (me)
      fetchMe: async () => {
        set({ loading: true, error: null });
        try {
          const response = await getMe();

          if (!response.success) {
            throw new Error(response.message);
          }

          set({
            currentUser: response.data,
            isLogin: true,
            loading: false,
          });

          return response.data;
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message || "Failed to fetch user";
          set({ loading: false, error: errorMessage });

          // If unauthorized, clear auth state
          if (err.response?.status === 401) {
            get().logout();
          }

          throw errorMessage;
        }
      },

      // Get user by ID
      fetchUserById: async (userId) => {
        set({ loading: true, error: null });
        try {
          const response = await getUserById(userId);

          if (!response.success) {
            throw new Error(response.message);
          }

          set({ loading: false });
          return response.data;
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message || "Failed to fetch user";
          set({ loading: false, error: errorMessage });
          throw errorMessage;
        }
      },

      // Update user
      updateUserProfile: async (userId, userData) => {
        set({ loading: true, error: null });
        try {
          const response = await updateUser(userId, userData);

          if (!response.success) {
            throw new Error(response.message);
          }

          // Update current user if updating own profile
          if (get().currentUser?.userId === userId) {
            set({
              currentUser: {
                ...get().currentUser,
                ...response.data,
              },
            });
          }

          set({ loading: false });
          return response;
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message || "Failed to update user";
          set({ loading: false, error: errorMessage });
          throw errorMessage;
        }
      },

      // Logout
      logout: () => {
        localStorage.removeItem("token");

        // Clear task store to prevent showing previous user's tasks
        useTaskStore.getState().clearStore();

        set({
          currentUser: null,
          token: null,
          isLogin: false,
          error: null,
        });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Check if user is authenticated
      checkAuth: () => {
        const token = localStorage.getItem("token");
        if (token) {
          set({ token, isLogin: true });
          // Optionally fetch user data
          get().fetchMe().catch(() => {
            // If fetch fails, logout
            get().logout();
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        currentUser: state.currentUser,
        isLogin: state.isLogin,
      }),
    }
  )
);

export default useAuthStore;