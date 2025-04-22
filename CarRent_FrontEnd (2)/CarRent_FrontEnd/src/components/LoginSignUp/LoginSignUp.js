import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Https/Axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AdminLogin } from "../../Https/AdminSideAxiosUrls";
export function LoginForm() {
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await axios.post(AdminLogin, {
        email,
        password,
      });

      const { token } = response.data;

      localStorage.setItem("CarAdminToken", token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials, please try again.");
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-slate-900 to-black px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-gradient-to-br from-slate-950 to-black border border-yellow-500/20 rounded-xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-yellow-400 font-serif">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="text-red-400 text-center border border-red-500/20 bg-red-900/10 p-2 rounded-md">
              {error}
            </div>
          )}

          <div>
            <input
              type="text"
              id="email"
              placeholder="Email Address"
              className="w-full px-5 py-3 bg-blue-900/10 border border-yellow-500/20 rounded-md text-yellow-100 placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="w-full px-5 py-3 bg-blue-900/10 border border-yellow-500/20 rounded-md text-yellow-100 placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="text-yellow-500 text-sm space-y-1">
            <p><strong>Example Email:</strong> admin@gmail.com</p>
            <p><strong>Example Password:</strong> admin@gmail.com</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;