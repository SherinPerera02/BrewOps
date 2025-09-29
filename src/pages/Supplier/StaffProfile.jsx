import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from '../../components/Spinner';
import StaffDashboardNav from '../../components/StaffDashboardNav';
import StaffDashboardSlidebar from '../../components/StaffDashboardSlidebar';
import { FaUser, FaEdit, FaSave, FaTimes, FaCamera, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUserTag } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

export default function StaffProfile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@brewops.com",
    contact: "+94 71 234 5678",
    address: "123 Tea Garden Lane, Kandy, Sri Lanka",
    role: "Staff Member",
    photoUrl: "",
    department: "Production",
    joinDate: "2023-01-15"
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  // Simulate loading profile data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const onPickImage = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Please select JPG, PNG, or WEBP image only.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image must be 3MB or smaller.");
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

  const saveProfile = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const uploadPhoto = async () => {
    if (!selectedFile) {
      toast.error("Please choose an image first.");
      return;
    }
    try {
      // Simulate photo upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile({ ...profile, photoUrl: previewUrl });
      clearSelectedImage();
      toast.success("Profile photo updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload photo.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <StaffDashboardNav />
        
        <div className="flex">
          {/* Sidebar */}
          <StaffDashboardSlidebar />
          
          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                      <FaUser className="text-green-600" />
                      My Profile
                    </h1>
                    <p className="text-gray-600 mt-2">Manage your personal information and account settings</p>
                  </div>
                  {!editMode ? (
                    <button
                      onClick={() => setEditMode(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <FaEdit />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={saveProfile}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50"
                      >
                        <FaSave />
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={() => {
                          setEditMode(false);
                          clearSelectedImage();
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
                      >
                        <FaTimes />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Content */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Profile Photo Section */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-8 border-b border-gray-200">
                  <div className="relative">
                    <img
                      src={previewUrl || profile.photoUrl || "/profile.png"}
                      alt="Profile"
                      className="h-32 w-32 rounded-full object-cover border-4 border-green-100 shadow-lg"
                    />
                    {editMode && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors shadow-lg"
                      >
                        <FaCamera size={16} />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                    <p className="text-green-600 font-medium">{profile.role}</p>
                    <p className="text-gray-500 mt-1">{profile.department} Department</p>
                    
                    {editMode && previewUrl && (
                      <div className="flex gap-3 mt-4 justify-center md:justify-start">
                        <button
                          onClick={uploadPhoto}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Save Photo
                        </button>
                        <button
                          onClick={clearSelectedImage}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                        >
                          Cancel
                        </button>
                      </div>
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

                {/* Profile Form */}
                <form onSubmit={saveProfile} className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaUser className="text-gray-400" />
                        Full Name
                      </label>
                      <input
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 transition-all duration-200"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaEnvelope className="text-gray-400" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 transition-all duration-200"
                        required
                      />
                    </div>

                    {/* Contact */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaPhone className="text-gray-400" />
                        Contact Number
                      </label>
                      <input
                        name="contact"
                        value={profile.contact}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 transition-all duration-200"
                      />
                    </div>

                    {/* Department */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaUserTag className="text-gray-400" />
                        Department
                      </label>
                      <select
                        name="department"
                        value={profile.department}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 transition-all duration-200"
                      >
                        <option value="Production">Production</option>
                        <option value="Quality Control">Quality Control</option>
                        <option value="Inventory">Inventory</option>
                        <option value="Logistics">Logistics</option>
                        <option value="Administration">Administration</option>
                      </select>
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaMapMarkerAlt className="text-gray-400" />
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        disabled={!editMode}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 resize-none transition-all duration-200"
                        placeholder="Enter your complete address"
                      />
                    </div>

                    {/* Role - Read Only */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaUserTag className="text-gray-400" />
                        Role
                      </label>
                      <input
                        value={profile.role}
                        disabled
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                      />
                    </div>

                    {/* Join Date - Read Only */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaUserTag className="text-gray-400" />
                        Join Date
                      </label>
                      <input
                        value={new Date(profile.joinDate).toLocaleDateString()}
                        disabled
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
