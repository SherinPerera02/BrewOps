import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "../../components/navigationBar";
import Footer from "../../components/Footer";

export default function StaffDashboardSettings() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notifications: true,
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notificationSettings, setNotificationSettings] = useState({
    lowStockAlerts: true,
    supplierUpdates: true,
    systemMessages: true,
  });

  // Fetch user profile
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setForm({
          name: data.name,
          email: data.email,
          phone: data.phone,
          notifications: data.notifications,
        });
        setNotificationSettings({
          lowStockAlerts: data.notificationSettings.lowStockAlerts,
          supplierUpdates: data.notificationSettings.supplierUpdates,
          systemMessages: data.notificationSettings.systemMessages,
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle notification settings changes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Save profile + password in one flow
  const handleSaveAll = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // 1. Update profile
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2. Update password only if provided
      if (passwordForm.currentPassword && passwordForm.newPassword) {
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
          alert("New passwords do not match.");
          setLoading(false);
          return;
        }
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/change-password`,
          {
            currentPassword: passwordForm.currentPassword,
            newPassword: passwordForm.newPassword,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // 3. Update notification settings
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/notifications`,
        notificationSettings,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Profile, notifications, and password updated successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error("Error saving:", err);
      alert("Failed to update settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationBar />
      <div className="flex-1 p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard Settings</h1>

        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                disabled
                className="w-full p-2 border rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="lowStockAlerts"
                checked={notificationSettings.lowStockAlerts}
                onChange={handleNotificationChange}
                className="mr-2"
              />
              Low Stock Alerts
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="supplierUpdates"
                checked={notificationSettings.supplierUpdates}
                onChange={handleNotificationChange}
                className="mr-2"
              />
              Supplier Updates
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="systemMessages"
                checked={notificationSettings.systemMessages}
                onChange={handleNotificationChange}
                className="mr-2"
              />
              System Messages
            </label>
          </div>
        </div>

        {/* Password Change */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))
                }
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))
                }
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                }
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Save All Changes */}
        <div className="mt-6">
          <button
            onClick={handleSaveAll}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
