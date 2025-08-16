import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import loginAnimation from "../assets/login.json";
import Lottie from "lottie-react";
import Spinner from "../components/Spinner";
import React, { useEffect } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading delay (e.g., fetching config, preloading images)
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 800); // 1.5 sec delay
    return () => clearTimeout(timer);
  }, []);

  if (loadingPage) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <Spinner />
      </div>
    );
  }

  function validateLoginForm() {
    const newErrors = {};

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Valid email is required";
      toast.error("Please enter a valid email address", {
        duration: 4000,
        position: "top-right",
        style: {
          
          padding: "16px",
          color: "#ff0000",
        },
        
      });
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      toast.error("Password cannot be empty", {
        duration: 4000,
        position: "top-right",
        style: {
          
          padding: "16px",
          color: "#ff0000",
        },
        
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleLogin() {
    if (!validateLoginForm()) {
      return;
    }

    setLoadingPage(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        {
          email,
          password,
        }
      );

      // Save token
      const token = response.data.token;
      const role = response.data.role; // Assuming backend returns user role
      localStorage.setItem("token", token);

      // Show toast message before navigating
      toast.success("Login Successful! Redirecting", {
        duration: 3000, // Stay for 3 seconds
        position: "top-center",
        style: {
          
          padding: "16px",
          color: "#4caf50",
        },
        
      });

      // Delay navigation until the toast message is shown
      setTimeout(() => {
        if (role === "supplier") {
          navigate("/SupplierDashboard", { state: { toastMessage: "Login Successful!" } });
        } else if (role === "staff") {
          navigate("/StaffDashboard", { state: { toastMessage: "Login Successful!" } });
        } else if (role === "manager") {
          navigate("/ManagerDashboard", { state: { toastMessage: "Login Successful!" } });
        } else {
          navigate("/admin", { state: { toastMessage: "Login Successful!" } });
        }
      }, 3000);
    } catch (e) {
      console.error("Login error:", e);

    } finally {
      setLoadingPage(false);
    }
  }

  function handleGoogleSignIn() {
    toast("Google Sign-In not yet connected!", { icon: "🔗" });
    // In real setup, redirect to Google OAuth URL
  }

  return (
    <>
      <Toaster />
      <div className="w-full h-screen bg-gray-50 bg-center bg-cover flex justify-evenly items-center">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[1300px] h-[600px] backdrop-blur-sm rounded-[20px] shadow-xl flex overflow-hidden">
            {/* Left half */}
            <div className="w-1/2 h-full flex flex-col items-center text-center bg-green-100 p-8">
              <h1 className="text-5xl font-bold text-green-600 mt-10">
                Welcome Back !
              </h1>

              <p className="text-md text-green-600 mt-4">
                Don't have an account yet?{" "}
                <br />
                <a href="/register">
                  <button
                    type="button"
                    className="mt-2 px-4 py-1 text-md rounded-full border border-green-600 bg-transparent hover:bg-black text-green-600 hover:text-white hover:border-black cursor-pointer font-semibold transition"
                  >
                    Register here
                  </button>
                </a>
              </p>

              {/* Animation below register */}
              <div className="w-full max-w-[300px] mt-6">
                <Lottie animationData={loginAnimation} loop={true} />
              </div>
            </div>

            {/* Right half */}
            <div className="w-1/2 h-full bg-white flex flex-col justify-center items-center p-6">
              <h1 className="text-green-800 text-4xl font-bold mb-6">Sign In</h1>

              <div className="w-[400px]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={`w-full h-[50px] border rounded-[20px] my-[10px] px-4 bg-transparent text-green-800 autofill:bg-transparent autofill:text-green-800 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="w-[400px]">
                <input
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className={`w-full h-[50px] border rounded-[20px] my-[10px] px-4 bg-transparent text-green-800 autofill:bg-transparent autofill:text-green-800 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="w-[400px] flex justify-between items-center text-sm text-green-800 mt-2 mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="appearance-none w-4 h-4 border border-gray-300 rounded bg-transparent checked:bg-[#1cbb3f] checked:border-[#1cbb3f] transition-colors duration-200 cursor-pointer "
                    style={{
                      backgroundImage: rememberMe
                        ? "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22white%22><path d=%22M7.629 15.314L3.314 11l1.414-1.414L7.629 12.486l7.643-7.643 1.414 1.414z%22/></svg>')"
                        : "none",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "70%",
                    }}
                  />
                  <span className="text-green-800">Remember Me</span>
                </label>
                <span
                  className="text-green-800 hover:underline cursor-pointer"
                  onClick={() => toast("Redirect to Forgot Password")}
                >
                  Forgot your password?
                </span>
              </div>

              {/* Sign In Button */}
              <button
                onClick={handleLogin}
                className="w-[400px] h-[50px] bg-green-800 rounded-[20px] text-[18px] font-bold text-white hover:bg-black hover:text-white cursor-pointer transition"
              >
                Sign In
              </button>

              {/* Divider */}
              <div className="flex items-center w-[400px] my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="text-gray-400 text-sm px-2">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Google Sign In */}
              <button
                onClick={handleGoogleSignIn}
                className="w-[400px] h-[50px] flex items-center justify-center gap-3 border border-gray-300 rounded-[20px] text-green-800 hover:bg-gray-300 hover:text-black transition cursor-pointer"
              >
                <FcGoogle size={22} /> Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


