import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import loginAnimation from "../assets/login.json";
import Lottie from "lottie-react";
import Spinner from "../components/Spinner";
import React, { useEffect } from "react";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loadingPage) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <Spinner />
      </div>
    );
  }

  function validateEmail() {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
      toast.error("Please enter your email address", {
        duration: 4000,
        position: "top-right",
        style: {
          padding: "16px",
          color: "#ff0000",
        },
      });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      toast.error("Please enter a valid email address", {
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

  async function handleForgotPassword() {
    if (!validateEmail()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call for forgot password
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, you would make an API call like:
      // const response = await axios.post(
      //   import.meta.env.VITE_BACKEND_URL + "/api/users/forgot-password",
      //   { email }
      // );

      setEmailSent(true);
      toast.success("Password reset email sent!", {
        duration: 4000,
        position: "top-center",
        style: {
          padding: "16px",
          color: "#4caf50",
        },
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Failed to send reset email. Please try again.", {
        duration: 4000,
        position: "top-center",
        style: {
          padding: "16px",
          color: "#ff0000",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleBackToLogin() {
    navigate("/login");
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
                Reset Password
              </h1>
              
              <p className="text-md text-green-600 mt-4">
                Don't worry! It happens to the best of us.
                <br />
                Enter your email and we'll send you a reset link.
              </p>

              {/* Animation */}
              <div className="w-full max-w-[300px] mt-6">
                <Lottie animationData={loginAnimation} loop={true} />
              </div>
            </div>

            {/* Right half */}
            <div className="w-1/2 h-full bg-white flex flex-col justify-center items-center p-6">
              {/* Back to Login Button */}
              <div className="w-[400px] flex justify-start mb-4">
                <button
                  onClick={handleBackToLogin}
                  className="flex items-center gap-2 text-green-800 hover:text-green-600 transition-colors cursor-pointer"
                >
                  <ArrowLeft size={20} />
                  <span>Back to Login</span>
                </button>
              </div>

              {!emailSent ? (
                <>
                  <h1 className="text-green-800 text-4xl font-bold mb-6">Forgot Password?</h1>
                  
                  <p className="text-gray-600 text-center mb-6 w-[400px]">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>

                  <div className="w-[400px]">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className={`w-full h-[50px] border rounded-[20px] my-[10px] pl-12 pr-4 bg-transparent text-green-800 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Send Reset Email Button */}
                  <button
                    onClick={handleForgotPassword}
                    disabled={isSubmitting}
                    className="w-[400px] h-[50px] bg-green-800 rounded-[20px] text-[18px] font-bold text-white hover:bg-black hover:text-white cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    {isSubmitting ? "Sending..." : "Send Reset Email"}
                  </button>
                </>
              ) : (
                // Success State
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <CheckCircle className="text-green-500" size={80} />
                  </div>
                  
                  <h1 className="text-green-800 text-4xl font-bold mb-4">Email Sent!</h1>
                  
                  <p className="text-gray-600 text-center mb-6 w-[400px]">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                  
                  <p className="text-gray-500 text-sm mb-6 w-[400px]">
                    Check your email and click the link to reset your password. 
                    If you don't see the email, check your spam folder.
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={handleBackToLogin}
                      className="w-[400px] h-[50px] bg-green-800 rounded-[20px] text-[18px] font-bold text-white hover:bg-black hover:text-white cursor-pointer transition"
                    >
                      Back to Login
                    </button>
                    
                    <button
                      onClick={() => {
                        setEmailSent(false);
                        setEmail("");
                      }}
                      className="w-[400px] h-[50px] border border-green-800 rounded-[20px] text-[18px] font-bold text-green-800 hover:bg-green-50 cursor-pointer transition"
                    >
                      Try Different Email
                    </button>
                  </div>
                </div>
              )}

              {/* Additional Help */}
              {!emailSent && (
                <div className="w-[400px] text-center mt-6">
                  <p className="text-gray-500 text-sm">
                    Remember your password?{" "}
                    <Link to="/login" className="text-green-800 hover:underline font-medium">
                      Sign In
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}