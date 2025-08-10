import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import registerAnimation from "../assets/register.json"; 
import Spinner from "../components/spinner";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "supplier", 
    companyName: "", 
    managerCode: "", 
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Update form state helper
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleRegister() {
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        phone: form.phone,
        ...(form.role === "supplier" && { companyName: form.companyName }),
        ...(form.role === "manager" && { managerCode: form.managerCode }),
      };

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/register",
        payload
      );

      toast.success("Registration Successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-screen bg-green-50 bg-center bg-cover flex justify-evenly items-center">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[1300px] h-[700px] backdrop-blur-sm rounded-[20px] shadow-xl flex overflow-hidden">
          {/* Left half */}
          <div className="w-1/2 h-full flex bg-white flex-col items-center text-center p-8">
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
            <div className="w-full max-w-[500px] mt-8">
              <Lottie animationData={registerAnimation} loop={true} />
            </div>
          </div>

          {/* Right half */}
          <div className="w-1/2 h-full bg-green-900 flex flex-col justify-center items-center p-6 overflow-auto">
            <h1 className="text-[#22cf2b] text-4xl font-bold mb-6">Register</h1>

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-[400px] h-[50px] border border-white rounded-[20px] my-[8px] px-4 bg-transparent text-white autofill:bg-transparent autofill:text-white"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-[400px] h-[50px] border border-white rounded-[20px] my-[8px] px-4 bg-transparent text-white autofill:bg-transparent autofill:text-white"
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-[400px] h-[50px] border border-white rounded-[20px] my-[8px] px-4 bg-transparent text-white autofill:bg-transparent autofill:text-white"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-[400px] h-[50px] border border-white rounded-[20px] my-[8px] px-4 bg-transparent text-white autofill:bg-transparent autofill:text-white"
            />

            {/* Confirm Password */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-[400px] h-[50px] border border-white rounded-[20px] my-[8px] px-4 bg-transparent text-white autofill:bg-transparent autofill:text-white"
            />

            {/* Role Selection */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-[400px] h-[50px] border border-white rounded-[20px] my-[8px] px-4 bg-transparent text-white cursor-pointer "
            >
              <option value="staff" className="bg-black text-white  ">Staff</option>
              <option value="supplier" className= "bg-black text-white ">Supplier</option>
              <option value="manager" className = "bg-black text-white ">Manager</option>
            </select>

            {/* Conditional fields based on role */}
            {form.role === "staff" && (
              <input
                type="text"
                name="StaffID"
                placeholder="Staff ID"
                value={form.StaffID}
                onChange={handleChange}
                className="w-[400px] h-[50px] border border-white rounded-[20px] my-[8px] px-4 bg-transparent text-white autofill:bg-transparent autofill:text-white"
              />
            )}

            {form.role === "supplier" && (
              <input
                type="text"
                name="SupplierID"
                placeholder="Supplier ID"
                value={form.SupplierID}
                onChange={handleChange}
                className="w-[400px] h-[50px] border border-white rounded-[20px] my-[8px] px-4 bg-transparent text-white autofill:bg-transparent autofill:text-white"
              />
            )}

            {form.role === "manager" && (
              <input
                type="text"
                name="managerId"
                placeholder="Manager ID"
                value={form.managerId}
                onChange={handleChange}
                className="w-[400px] h-[50px] border border-white rounded-[20px] my-[8px] px-4 bg-transparent text-white autofill:bg-transparent autofill:text-white"
              />
            )}

            {/* Register Button */}
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-[400px] h-[50px] bg-[#1cbb3f] rounded-[20px] text-[18px] font-bold text-black hover:bg-black hover:text-white cursor-pointer transition flex items-center justify-center mt-4"
            >
              {loading ? <Spinner /> : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
