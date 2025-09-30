// src/pages/Supplier/Setting.jsx - Staff Settings Page
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUser, FaBell, FaLock, FaCog, FaLeaf, FaArrowLeft } from 'react-icons/fa';
import Spinner from '../../components/Spinner';

export default function StaffSettings() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    role: "staff",
    photoUrl: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingPhoto, setSavingPhoto] = useState(false);
  const fileInputRef = useRef(null);
  
  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      browser: true,
      inventoryAlerts: true
    },
    preferences: {
      theme: 'light',
      language: 'english',
      timezone: 'UTC+05:30'
    },
    privacy: {
      profileVisibility: 'team',
      showOnlineStatus: true
    }
  });

  // ---- Load profile ----
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile/me", { withCredentials: true })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // ---- Image picker ----
  const onPickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      alert("Please select JPG, PNG, or WEBP image.");
      return;
    }

    const maxMB = 3;
    if (file.size > maxMB * 1024 * 1024) {
      alert(`Image must be ≤ ${maxMB} MB.`);
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearSelectedImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ---- Save profile ----
  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put("http://localhost:5000/api/profile/me", profile, { withCredentials: true });
      alert("Profile updated ✅");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // ---- Upload photo ----
  const uploadPhoto = async () => {
    if (!selectedFile) {
      alert("Please choose an image first.");
      return;
    }
    setSavingPhoto(true);
    try {
      const formData = new FormData();
      formData.append("photo", selectedFile);
      const { data } = await axios.post(
        "http://localhost:5000/api/profile/me/photo",
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      setProfile({ ...profile, photoUrl: data.photoUrl });
      clearSelectedImage();
      alert("Photo updated ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to upload photo.");
    } finally {
      setSavingPhoto(false);
    }
  };

  if (loading) return <div className="p-8">{<Spinner />}</div>;

  return (
    <div className="min-h-screen bg-green-50">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
          <div className="flex items-center gap-3">
            <FaLeaf className="text-2xl" />
            <div className="text-2xl font-bold">BrewOps Tea Factory</div>
          </div>
          <div className="flex items-center space-x-6 mt-2 md:mt-0">
            <Link to="/StaffDashboard" className="flex items-center gap-2 hover:text-green-200 transition-colors">
              <FaArrowLeft /> Back to Dashboard
            </Link>
            <Link to="/Staff/profile" className="hover:text-green-200 transition-colors">
              <FaUser className="inline mr-1" /> Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Settings Section */}
      <div className="py-8 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FaCog className="text-green-600" />
              Staff Settings
            </h1>
            <p className="text-gray-600 mt-2">Manage your profile, notifications, and preferences</p>
          </div>
          
          {/* Settings Tabs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button className="py-4 px-2 border-b-2 border-green-500 text-green-600 font-medium">
                  <FaUser className="inline mr-2" />Profile Information
                </button>
                <button className="py-4 px-2 text-gray-500 hover:text-gray-700">
                  <FaBell className="inline mr-2" />Notifications
                </button>
                <button className="py-4 px-2 text-gray-500 hover:text-gray-700">
                  <FaLock className="inline mr-2" />Privacy & Security
                </button>
              </nav>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center flex-wrap mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
                  <p className="text-gray-600 mt-1">Update your personal details and profile photo</p>
                </div>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mt-2 md:mt-0"
                  >
                    <FaCog className="inline mr-2" />Edit Profile
                  </button>
                )}
              </div>

          {/* Avatar */}
          <div className="mt-6 flex flex-col md:flex-row gap-6 md:items-center">
            <div className="relative">
              <img
                src={previewUrl || profile.photoUrl || "https://via.placeholder.com/160x160?text=Avatar"}
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover border border-gray-200"
              />
            </div>
            {editMode && (
              <div className="flex-1">
                <div className="flex gap-3 flex-wrap mt-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow"
                  >
                    Choose Image
                  </button>
                  {previewUrl && (
                    <>
                      <button
                        type="button"
                        onClick={uploadPhoto}
                        disabled={savingPhoto}
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow disabled:opacity-60"
                      >
                        {savingPhoto ? "Uploading..." : "Save Image"}
                      </button>
                      <button
                        type="button"
                        onClick={clearSelectedImage}
                        className="px-4 py-2 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={onPickImage}
                />
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={saveProfile} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
              <input
                name="contact"
                value={profile.contact}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                name="address"
                value={profile.address}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                value={profile.role}
                readOnly
                className="w-full bg-gray-50 rounded-xl border border-gray-200 px-3 py-2 text-gray-600"
              />
            </div>

            {editMode && (
              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-5 py-2 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
          
          {/* Notification Settings */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaBell className="text-green-600" />
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, email: e.target.checked }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">Inventory Alerts</h4>
                  <p className="text-sm text-gray-600">Get notified about low inventory levels</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.inventoryAlerts}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, inventoryAlerts: e.target.checked }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          {/* Work Preferences */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaLeaf className="text-green-600" />
              Work Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Shift</label>
                <select className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600">
                  <option>Morning Shift (6:00 AM - 2:00 PM)</option>
                  <option>Evening Shift (2:00 PM - 10:00 PM)</option>
                  <option>Night Shift (10:00 PM - 6:00 AM)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  value={profile.role === 'staff' ? 'Tea Processing Department' : profile.role}
                  readOnly
                  className="w-full bg-gray-50 rounded-lg border border-gray-200 px-3 py-2 text-gray-600"
                />
              </div>
            </div>
          </div>
          
          {/* Save Settings Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <FaCog />
              Save All Settings
            </button>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
