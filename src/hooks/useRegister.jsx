import { useNavigate } from "react-router";
import { useState } from "react";
import useAuthStore from "../store/userStore";

export const useRegister = () => {
  const register = useAuthStore((s) => s.register);
  const loading = useAuthStore((s) => s.loading);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const registerUser = async (formData) => {
    setMessage("");
    try {
      const res = await register(formData);
      setMessage(`✅ ${res.message}`);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setMessage(`❌ ${err}`);
    }
  };

  return { registerUser, loading, message };
};