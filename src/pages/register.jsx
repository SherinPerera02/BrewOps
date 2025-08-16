import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import registerAnimation from "../assets/register.json"; 
import Spinner from "../components/Spinner";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: "", // Initialize phone with an empty string to avoid uncontrolled to controlled warning
    supplierId: "",
    staffId: "",
    managerId: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Update form state helper
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validateForm() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Valid email is required";
    }

    if (!form.phone.trim() || !/^\+?[0-9]{10,15}$/.test(form.phone)) {
      newErrors.phone = "Valid phone number is required";
    }

    if (!form.password.trim() || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!form.role) {
      newErrors.role = "Role is required";
    }

    if (form.role === "supplier" && !form.supplierId.trim()) {
      newErrors.supplierId = "Supplier ID is required";
    }

    if (form.role === "staff" && !form.staffId.trim()) {
      newErrors.staffId = "Staff ID is required";
    }

    if (form.role === "manager" && !form.managerId.trim()) {
      newErrors.managerId = "Manager ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleRegister() {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role,
        employeeId: form.role === "supplier" ? form.supplierId : form.role === "staff" ? form.staffId : form.managerId,
      };

      console.log("Payload being sent:", payload); // Debugging log

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/register",
        payload
      );

      toast.success("Registration Successful! Please login.", {
        duration: 4000,
        bgColor: "#4caf50",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error.response || error); // Debugging log
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster />
      <div className="w-full h-screen bg-gray-50 bg-center bg-cover flex justify-evenly items-center">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[1300px] h-[600px] backdrop-blur-sm rounded-[20px] shadow-xl flex overflow-hidden">
            {/* Left half */}
            <div className="w-1/2 h-full flex flex-col items-center text-center bg-green-100 p-8">
              <h1 className="text-5xl font-bold text-green-600 mt-10">Join Us!</h1>

              <p className="text-md text-green-600 mt-4">
                Already have an account? <br />
                <a href="/login">
                  <button
                    type="button"
                    className="mt-2 px-4 py-1 text-md rounded-full border border-green-600 bg-transparent hover:bg-black text-green-600 hover:text-white hover:border-black font-semibold transition"
                  >
                    Login here
                  </button>
                </a>
              </p>

              {/* Animation */}
              <div className="w-full max-w-[300px] mt-6">
                <Lottie animationData={registerAnimation} loop={true} />
              </div>
            </div>

            {/* Right half */}
            <div className="w-1/2 h-full bg-white flex flex-col justify-center items-center p-6 overflow-auto">
              <h1 className="text-green-900 text-4xl font-bold mb-6">Register</h1>

              {/* Name */}
              <div className="w-[400px]">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  aria-label="Full Name"
                  disabled={loading}
                  className="w-full h-[50px] border border-gray-300 rounded-[20px] my-[10px] px-4 bg-transparent text-green-800 autofill:bg-transparent autofill:text-green-800"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="w-[400px]">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  aria-label="Email Address"
                  disabled={loading}
                  className="w-full h-[50px] border border-gray-300 rounded-[20px] my-[10px] px-4 bg-transparent text-green-800 autofill:bg-transparent autofill:text-green-800"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="w-[400px]">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  aria-label="Phone Number"
                  disabled={loading}
                  className="w-full h-[50px] border border-gray-300 rounded-[20px] my-[10px] px-4 bg-transparent text-green-800 autofill:bg-transparent autofill:text-green-800"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              {/* Password */}
              <div className="w-[400px]">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  aria-label="Password"
                  disabled={loading}
                  className="w-full h-[50px] border border-gray-300 rounded-[20px] my-[10px] px-4 bg-transparent text-green-800 autofill:bg-transparent autofill:text-green-800"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="w-[400px]">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  aria-label="Confirm Password"
                  disabled={loading}
                  className="w-full h-[50px] border border-gray-300 rounded-[20px] my-[10px] px-4 bg-transparent text-green-800 autofill:bg-transparent autofill:text-green-800"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>

              {/* Role Selection */}
              <div className="w-[400px]">
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  aria-label="Role Selection"
                  disabled={loading}
                  className="w-full h-[50px] border border-gray-300 rounded-[20px] my-[10px] px-4 bg-white text-green-800 cursor-pointer appearance-none focus:outline-none focus:ring-0"
                >
                  <option value="" disabled>Choose a Role</option>
                  <option value="supplier">Supplier</option>
                  <option value="staff">Staff</option>
                  <option value="manager">Manager</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
              </div>

              {/* Conditional fields based on role */}
              {form.role === "supplier" && (
                <div className="w-[400px]">
                  <input
                    type="text"
                    name="supplierId"
                    placeholder="Supplier ID"
                    value={form.supplierId || ""}
                    onChange={handleChange}
                    aria-label="Supplier ID"
                    disabled={loading}
                    className="w-full h-[50px] border border-gray-300 rounded-[20px] my-[10px] px-4 bg-transparent text-green-800 autofill:bg-transparent autofill:text-green-800"
                  />
                  {errors.supplierId && <p className="text-red-500 text-sm">{errors.supplierId}</p>}
                </div>
              )}

              {form.role === "staff" && (
                <div className="w-[400px]">
                  <input
                    type="text"
                    name="staffId"
                    placeholder="Staff ID"
                    value={form.staffId || ""}
                    onChange={handleChange}
                    aria-label="Staff ID"
                    disabled={loading}
                    className="w-full h-[50px] border border-gray-300 rounded-[20px] my-[10px] px-4 bg-transparent text-green-800 autofill:bg-transparent autofill:text-green-800"
                  />
                  {errors.staffId && <p className="text-red-500 text-sm">{errors.staffId}</p>}
                </div>
              )}

              {form.role === "manager" && (
                <div className="w-[400px]">
                  <input
                    type="text"
                    name="managerId"
                    placeholder="Manager ID"
                    value={form.managerId || ""}
                    onChange={handleChange}
                    aria-label="Manager ID"
                    disabled={loading}
                    className="w-full h-[50px] border border-gray-300 rounded-[20px] my-[10px] px-4 bg-transparent text-green-800 autofill:bg-transparent autofill:text-green-800"
                  />
                  {errors.managerId && <p className="text-red-500 text-sm">{errors.managerId}</p>}
                </div>
              )}

              {/* Register Button */}
              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-[400px] h-[50px] bg-green-800 rounded-[20px] text-[18px] font-bold text-white hover:bg-black hover:text-white cursor-pointer transition flex items-center justify-center mt-4"
              >
                {loading ? <Spinner /> : "Register"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
