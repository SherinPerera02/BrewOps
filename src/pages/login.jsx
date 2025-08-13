import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import loginAnimation from "../assets/login.json";
import Lottie from "lottie-react";
import Spinner from "../components/spinner";
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";

export default function LoginPage() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ name: decoded.name, role: decoded.role });
      } catch {
        setUser(null);
      }
    }
  }, []);

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

  async function handleLogin() {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/api/users/login",
      {
        email,
        password,
      }
    );

    toast.success("Login Successful");

    // Save token
    const token = response.data.token;
    localStorage.setItem("token", token);

    // Decode token to get user info
    const decoded = jwt_decode(token);
    setUser({ name: decoded.name, role: decoded.role });

    // Remember Me handling
    if (rememberMe) {
      localStorage.setItem("rememberEmail", email);
    } else {
      localStorage.removeItem("rememberEmail");
    }

    // Redirect based on role
    if (decoded.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  } catch (e) {
    toast.error(e.response?.data?.message || "Login failed");
  }
}

// Inside your login logic
const userData = { name: "Admin User", role: "admin" };
localStorage.setItem("user", JSON.stringify(userData));

  function handleGoogleSignIn() {
    toast("Google Sign-In not yet connected!", { icon: "🔗" });
    // In real setup, redirect to Google OAuth URL
  }

  async function onSubmitLogin(email, password) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok && data.token) {
    props.onLogin(data.token);  // Pass token back to App to decode and set user
  } else {
    alert(data.message || "Login failed");
  }
}


  return (
    
    <div className="w-full h-screen bg-green-50 bg-center bg-cover flex justify-evenly items-center">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[1300px] h-[600px] backdrop-blur-sm rounded-[20px] shadow-xl flex overflow-hidden">

          {/* Left half */}
         
            <div className="w-1/2 h-full flex flex-col items-center text-center bg-white p-8">
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
          <div className="w-1/2 h-full bg-green-900 flex flex-col justify-center items-center p-6">
            <h1 className="text-[#22cf2b] text-4xl font-bold mb-6">Sign In</h1>

            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-[400px] h-[50px] border border-white rounded-[20px] my-[10px] px-4 bg-transparent text-white autofill:bg-transparent autofill:text-white"
            />

            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-[400px] h-[50px] border border-white rounded-[20px] my-[10px] px-4 bg-transparent text-white autofill:bg-transparent autofill:text-white"
            />

            {/* Remember Me & Forgot Password */}
            <div className="w-[400px] flex justify-between items-center text-sm text-[#1cbb3f] mt-2 mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="appearance-none w-4 h-4 border border-white rounded bg-transparent checked:bg-[#1cbb3f] checked:border-[#1cbb3f] transition-colors duration-200 cursor-pointer "

                  style={{
                    backgroundImage: rememberMe
                        ? "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22white%22><path d=%22M7.629 15.314L3.314 11l1.414-1.414L7.629 12.486l7.643-7.643 1.414 1.414z%22/></svg>')"
                        : "none",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "70%",
                    }}
                />
                <span>Remember Me</span>
              </label>
              <span
                className="text-[#1cbb3f] hover:underline cursor-pointer"
                onClick={() => toast("Redirect to Forgot Password")}
              >
                Forgot your password?
              </span>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              className="w-[400px] h-[50px] bg-[#1cbb3f] rounded-[20px] text-[18px] font-bold text-black hover:bg-black hover:text-white cursor-pointer transition"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="flex items-center w-[400px] my-4">
              <div className="flex-grow border-t border-gray-500"></div>
              <span className="text-gray-400 text-sm px-2">or</span>
              <div className="flex-grow border-t border-gray-500"></div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              className="w-[400px] h-[50px] flex items-center justify-center gap-3 border border-white rounded-[20px] text-white hover:bg-white hover:text-black transition cursor-pointer"
            >
              <FcGoogle size={22} /> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


