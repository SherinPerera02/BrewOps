import React, { useState } from 'react';
import NavigationBar from '../components/navigationBar';
import Footer from '../components/Footer';
import { MdEmail, MdFacebook, MdLocationOn, MdPhone } from 'react-icons/md';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    setLoading(true);

    try {
      // Change this URL to your actual backend endpoint for contact messages
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      setSuccessMsg("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setErrorMsg(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />

      <main className="flex-1 bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Info Section */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h1 className="text-3xl font-bold text-green-800 mb-4">
              Get in Touch
            </h1>
            <p className="text-gray-600 mb-6">
              Whether you have questions about our tea production, supply chain, 
              or need support, our dedicated team is here to assist you every step of the way.
            </p>

            <div className="space-y-4">
              <p className="flex items-center gap-3 text-gray-700">
                <MdEmail className="text-blue-600 text-2xl" />
                brewopsTea@gmail.com
              </p>

              <p className="flex items-center gap-3 text-gray-700">
                <MdPhone className="text-green-600 text-2xl" />
                +94711738453
              </p>

              <p className="flex items-center gap-3 text-gray-700">
                <MdLocationOn className="text-red-600 text-2xl" />
                Maleesha Tea Factory, Omattha road, Agalawattha, Mathugama, Sri Lanka
              </p>

              <p className="flex items-center gap-3 text-gray-700">
                <MdFacebook className="text-blue-600 text-2xl" />
                facebook.com/teafactory
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Send Us a Message
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone No
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              {errorMsg && (
                <p className="text-red-600 font-semibold">{errorMsg}</p>
              )}

              {successMsg && (
                <p className="text-green-600 font-semibold">{successMsg}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-lg text-white ${
                  loading ? "bg-green-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-900"
                } transition duration-300`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
