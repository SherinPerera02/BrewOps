import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "../../components/NavigationBar";
import SupplierSidebar from "../../components/SupplierSidebar";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profileImage: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    password: "",
    confirmPassword: "",
  });

  // Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(res.data);
        setForm({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          address: res.data.address,
          profileImage: res.data.profileImage || "",
        });
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
      setForm({ ...form, profileImageFile: file });
    }
  };

  // Handle password input
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  // Save profile changes
  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("address", form.address);
      if (form.profileImageFile) {
        formData.append("profileImage", form.profileImageFile);
      }

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );

      setEditMode(false);
      window.location.reload();
    } catch (err) {
      console.error("Error updating profile", err);
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const handleChangePassword = async () => {
    if (passwordForm.password !== passwordForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/change-password`,
        { password: passwordForm.password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPasswordMode(false);
      setPasswordForm({ password: "", confirmPassword: "" });
      alert("Password updated successfully");
    } catch (err) {
      console.error("Error changing password", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationBar />

      <div className="flex flex-1">
        <SupplierSidebar />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>

          {user && (
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-6">
                <img
                  src={previewImg || form.profileImage || "/default-avatar.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                />
                {editMode && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-3"
                  />
                )}
              </div>

              {/* Profile Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full p-2 border rounded-lg ${
                      editMode ? "bg-white" : "bg-gray-100"
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    disabled
                    className="w-full p-2 border rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full p-2 border rounded-lg ${
                      editMode ? "bg-white" : "bg-gray-100"
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full p-2 border rounded-lg ${
                      editMode ? "bg-white" : "bg-gray-100"
                    }`}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-4">
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>

              {/* Change Password */}
              <div className="mt-8 border-t pt-4">
                {!passwordMode ? (
                  <button
                    onClick={() => setPasswordMode(true)}
                    className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Change Password
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={passwordForm.password}
                        onChange={handlePasswordChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={handleChangePassword}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Update Password
                      </button>
                      <button
                        onClick={() => setPasswordMode(false)}
                        className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
