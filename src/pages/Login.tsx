import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserExists } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import instance from "../axios/axios";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ name: "", password: "" });
  const [registerData, setRegisterData] = useState({ phone: "", name: "", password: "" });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Login API
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await instance.post("/user/login", loginData);

      if (res.data.success) {
        // Save token if backend sends one
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        dispatch(setUserExists(true));
        navigate("/");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register API
  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await instance.post("/user/register", registerData);

      if (res.data.success) {
        // After registration, log in automatically
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        dispatch(setUserExists(true));
        navigate("/");
      } else {
        alert(res.data.message || "Register failed");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Register error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-md">
        
        {/* Tabs */}
        <div className="flex">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-3 font-semibold ${
              activeTab === "login" ? "bg-white" : "bg-gray-100"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-3 font-semibold ${
              activeTab === "register" ? "bg-white" : "bg-gray-100"
            }`}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin} className="p-5 grid gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                type="text"
                value={loginData.name}
                onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {/* Register Form */}
        {activeTab === "register" && (
          <form onSubmit={handleRegister} className="p-5 grid gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Phone Number</label>
              <input
                type="text"
                value={registerData.phone}
                onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                type="text"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
