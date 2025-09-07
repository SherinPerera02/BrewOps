import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Spinner from '../../components/Spinner';

export default function StaffProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    role: "staff",
    photoUrl: "",
  });

  const [originalProfile, setOriginalProfile] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [errors, setErrors] = useState({});
  const [changesSaved, setChangesSaved] = useState(false);
  
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Load profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/profile/me", { 
          withCredentials: true 
        });
        
        const profileData = response.data;
        setProfile(profileData);
        setOriginalProfile(profileData); // Keep original for cancel functionality
      } catch (error) {
        console.error("Error fetching profile:", error);
        
        // Handle authentication errors
        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          navigate("/login");
          return;
        }
        
        alert("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (changesSaved) {
      const timer = setTimeout(() => setChangesSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [changesSaved]);

  // Validation functions
  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.length < 2) error = "Name must be at least 2 characters";
        else if (value.length > 50) error = "Name must not exceed 50 characters";
        else if (!/^[a-zA-Z\s]+$/.test(value)) error = "Name can only contain letters and spaces";
        break;
        
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Please enter a valid email address";
        break;
        
      case "contact":
        if (value && !/^[0-9+\-\s()]+$/.test(value)) error = "Please enter a valid contact number";
        else if (value && value.length < 10) error = "Contact number must be at least 10 digits";
        break;
        
      case "address":
        if (value && value.length > 200) error = "Address must not exceed 200 characters";
        break;
        
      default:
        break;
    }
    
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(profile).forEach(key => {
      if (key !== "role" && key !== "photoUrl") {
        const error = validateField(key, profile[key]);
        if (error) newErrors[key] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes with real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update profile state
    setProfile(prev => ({ ...prev, [name]: value }));
    
    // Clear previous error and validate field
    const fieldError = validateField(name, value);
    setErrors(prev => ({ 
      ...prev, 
      [name]: fieldError 
    }));
  };

  // Handle image selection
  const onPickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please select a JPG, PNG, or WEBP image.");
      return;
    }
    
    // Validate file size (3MB limit)
    if (file.size > 3 * 1024 * 1024) {
      alert("Image size must be 3MB or less.");
      return;
    }
    
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Clear selected image
  const clearSelectedImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // Clean up blob URL
    }
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Save profile changes
  const saveProfile = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Please fix all errors before saving.");
      return;
    }
    
    setSaving(true);
    
    try {
      const response = await axios.put(
        "http://localhost:5000/api/profile/me", 
        profile, 
        { withCredentials: true }
      );
      
      // Update both current and original profile
      setProfile(response.data);
      setOriginalProfile(response.data);
      setEditMode(false);
      setErrors({});
      setChangesSaved(true);
      
    } catch (error) {
      console.error("Error updating profile:", error);
      
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      }
      
      if (error.response?.status === 400) {
        alert("Invalid data provided. Please check your entries.");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  // Upload photo
  const uploadPhoto = async () => {
    if (!selectedFile) {
      alert("Please choose an image first.");
      return;
    }
    
    setSavingPhoto(true);
    
    try {
      const formData = new FormData();
      formData.append("photo", selectedFile);
      
      const response = await axios.post(
        "http://localhost:5000/api/profile/me/photo",
        formData,
        { 
          withCredentials: true, 
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      
      const updatedPhotoUrl = response.data.photoUrl;
      setProfile(prev => ({ ...prev, photoUrl: updatedPhotoUrl }));
      setOriginalProfile(prev => ({ ...prev, photoUrl: updatedPhotoUrl }));
      clearSelectedImage();
      setChangesSaved(true);
      
    } catch (error) {
      console.error("Error uploading photo:", error);
      
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      }
      
      alert("Failed to upload photo. Please try again.");
    } finally {
      setSavingPhoto(false);
    }
  };

  // Handle edit mode toggle
  const handleEditToggle = () => {
    if (editMode) {
      // Cancel edit - restore original values
      if (JSON.stringify(profile) !== JSON.stringify(originalProfile)) {
        const confirmCancel = window.confirm(
          "You have unsaved changes. Are you sure you want to cancel?"
        );
        if (!confirmCancel) return;
      }
      
      setProfile(originalProfile);
      setErrors({});
      clearSelectedImage();
    }
    
    setEditMode(!editMode);
  };

  // Check if profile has changes
  const hasChanges = JSON.stringify(profile) !== JSON.stringify(originalProfile) || selectedFile;

  // Input field component
  const InputField = ({ label, name, type = "text", disabled, required = false }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={profile[name] || ""}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className={`w-full rounded-lg border px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
          disabled 
            ? "bg-gray-50 text-gray-600 border-gray-200" 
            : "bg-white border-gray-300"
        } ${
          errors[name] ? "border-red-500 bg-red-50" : ""
        }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-50">
        <div className="text-center">
          <Spinner />
          <p className="text-gray-600 mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Navigation Bar */}
      <nav className="bg-green-700 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-3xl font-bold">BreOps</div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6">
            <Link to="/staff" className="hover:underline transition-colors px-3 py-1 rounded">
              Dashboard
            </Link>
            <Link to="/" className="hover:underline transition-colors px-3 py-1 rounded">
              Home
            </Link>
            <Link to="/staff/profile" className="bg-green-600 px-3 py-1 rounded">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Profile</h1>
              <p className="text-gray-600 mt-1">
                {editMode ? "Update your profile information" : "View your profile details"}
              </p>
            </div>
            
            <div className="flex gap-3">
              {changesSaved && (
                <div className="flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Changes saved!
                </div>
              )}
              
              {!editMode ? (
                <button
                  onClick={handleEditToggle}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={previewUrl || profile.photoUrl || "https://via.placeholder.com/160x160/e5e7eb/6b7280?text=No+Image"}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/160x160/e5e7eb/6b7280?text=Avatar";
                  }}
                />
                {editMode && (
                  <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {editMode && (
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3">Profile Photo</h3>
                <div className="flex gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors shadow"
                  >
                    Choose Image
                  </button>
                  
                  {selectedFile && (
                    <>
                      <button
                        type="button"
                        onClick={uploadPhoto}
                        disabled={savingPhoto}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow disabled:opacity-50"
                      >
                        {savingPhoto ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                            </svg>
                            Uploading...
                          </span>
                        ) : (
                          "Save Image"
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={clearSelectedImage}
                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
                
                <p className="text-sm text-gray-500 mt-2">
                  Supports JPG, PNG, WEBP formats. Max size: 3MB
                </p>
                
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

          {/* Profile Form */}
          <form onSubmit={saveProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label="Full Name" 
                name="name" 
                disabled={!editMode} 
                required={true}
              />
              <InputField 
                label="Email Address" 
                name="email" 
                type="email" 
                disabled={!editMode} 
                required={true}
              />
              <InputField 
                label="Contact Number" 
                name="contact" 
                disabled={!editMode}
              />
              <InputField 
                label="Address" 
                name="address" 
                disabled={!editMode}
              />
            </div>

            {/* Role field (read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                value={profile.role || ""}
                readOnly
                className="w-full bg-gray-50 rounded-lg border border-gray-200 px-3 py-2 text-gray-600"
              />
            </div>

            {/* Action buttons */}
            {editMode && (
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <button
                  type="submit"
                  disabled={saving || !hasChanges}
                  className={`px-6 py-3 rounded-lg transition-colors font-medium ${
                    saving || !hasChanges
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700 shadow-md"
                  }`}
                >
                  {saving ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                      </svg>
                      Saving Changes...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}