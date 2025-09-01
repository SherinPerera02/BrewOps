import React, { useState } from "react";
import { User, Mail, Phone, MapPin, CreditCard, Lock, Eye, EyeOff, Save, Home, Package, ShoppingCart, BarChart3, Settings, LogOut, X } from "lucide-react";
import NavigationBar from "../components/navigationBar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { FaUserCircle, FaUser as FaUserIcon, FaFileAlt, FaMoneyBillWave, FaCog, FaPlus, FaSearch, FaLeaf, FaChartBar, FaTruck } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const EditProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    supplierId: '',
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    bankAccountNumber: '',
    bankName: '',
    branchCode: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Profile updated:', formData);
  };

  const sidebarItems = [
    { icon: Home, label: "Dashboard", href: "#" },
    { icon: Package, label: "Products", href: "#" },
    { icon: ShoppingCart, label: "Orders", href: "#" },
    { icon: BarChart3, label: "Analytics", href: "#" },
    { icon: User, label: "Profile", href: "#", active: true },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
  <NavigationBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        {/* Supplier Sidebar (keeps supplier dashboard styling) */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 transition-transform duration-300 ease-in-out`}>
          <div className="w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-r border-gray-700 h-full">
            <div className="p-6 h-full flex flex-col">
              {/* User Profile Section */}
              <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <FaUserCircle className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Supplier Portal</h3>
                  <p className="text-gray-400 text-sm">Tea Leaf Supplier</p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2">
				<Link 
                  to="/" 
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
                >
                  <FaFileAlt className="text-xl" />
                  <span>Home</span>
                </Link>
                
                <Link 
                  to="/SupplierDashboard" 
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
                >
                  <MdDashboard className="text-xl" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                
                <Link 
                  to="/suppliers/transactions" 
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
                >
                  <FaFileAlt className="text-xl" />
                  <span>Supply Records</span>
                </Link>
                
                <Link 
                  to="/suppliers/paymentSummary" 
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
                >
                  <FaMoneyBillWave className="text-xl" />
                  <span>Payment Records</span>
                </Link>
                
                <Link 
                  to="/suppliers/editProfile" 
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700 text-white shadow-md"
                >
                  <FaUserIcon className="text-xl" />
                  <span>Edit Profile</span>
                </Link>
                
                <Link 
                  to="/supplier/settings" 
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
                >
                  <FaCog className="text-xl" />
                  <span>Settings</span>
                </Link>
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-700 pb-2 mb-4">
                  Quick Actions
                </h4>
                
                <div className="space-y-3">
                  <Link 
                    to="/supplier/create-supply-recode" 
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 transition-all duration-200 shadow-lg"
                  >
                    <FaPlus className="text-lg" />
                    <span className="font-medium">New Supply Record</span>
                  </Link>
                  
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg">
                    <FaSearch className="text-lg" />
                    <span className="font-medium">Search Records</span>
                  </button>
                </div>
              </div>

              {/* Quick Stats Section - Moved to Bottom */}
              <div className="space-y-4 mt-auto">
                <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-700 pb-2">
                  Quick Stats
                </h4>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Monthly Delivery</p>
                        <p className="text-white text-2xl font-bold">-- kg</p>
                      </div>
                      <FaLeaf className="text-green-200 text-2xl" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Quality Score</p>
                        <p className="text-white text-2xl font-bold">--%</p>
                      </div>
                      <FaChartBar className="text-blue-200 text-2xl" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Monthly Revenue</p>
                        <p className="text-white text-xl font-bold">Rs. --</p>
                      </div>
                      <FaMoneyBillWave className="text-purple-200 text-2xl" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-4 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm">Delivery Rate</p>
                        <p className="text-white text-2xl font-bold">--%</p>
                      </div>
                      <FaTruck className="text-orange-200 text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
 
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-8 py-6 border-b border-gray-200">
                <h2 className="text-3xl font-bold text-green-700">Edit Profile</h2>
                <p className="text-gray-600 mt-2">Update your account information and settings</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Basic Information Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="mb-2 font-semibold text-gray-700 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Supplier ID
                    </label>
                    <input 
                      type="text"
                      name="supplierId"
                      value={formData.supplierId}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" 
                      placeholder="Enter your Supplier ID"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="mb-2 font-semibold text-gray-700 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Full Name
                    </label>
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" 
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="mb-2 font-semibold text-gray-700 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Address
                    </label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" 
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="mb-2 font-semibold text-gray-700 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Number
                    </label>
                    <input 
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" 
                      placeholder="Enter your contact number"
                      required
                    />
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center border-b pb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    Address Information
                  </h3>
                  
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Street Address</label>
                    <input 
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" 
                      placeholder="Enter your street address"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-2 font-semibold text-gray-700">City</label>
                      <input 
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" 
                        placeholder="Enter city"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-semibold text-gray-700">Postal Code</label>
                      <input 
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" 
                        placeholder="Enter postal code"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-semibold text-gray-700">Country</label>
                      <select 
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                        required
                      >
                        <option value="">Select Country</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="IN">India</option>
                        <option value="US">United States</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Banking Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center border-b pb-2">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Banking Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 font-semibold text-gray-700">Bank Name</label>
                      <input 
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" 
                        placeholder="Enter bank name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-semibold text-gray-700">Branch Code</label>
                      <input 
                        type="text"
                        name="branchCode"
                        value={formData.branchCode}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" 
                        placeholder="Enter branch code"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Bank Account Number</label>
                    <input 
                      type="text"
                      name="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" 
                      placeholder="Enter your bank account number"
                      required
                    />
                  </div>
                </div>

                {/* Password Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center border-b pb-2">
                    <Lock className="h-5 w-5 mr-2" />
                    Security Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 font-semibold text-gray-700">New Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded-lg px-4 py-3 w-full pr-12 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" 
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-semibold text-gray-700">Confirm Password</label>
                      <div className="relative">
                        <input 
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded-lg px-4 py-3 w-full pr-12 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" 
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <button 
                    type="button" 
                    onClick={handleSubmit}
                    className="flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

  <Footer />
    </div>
  );
};

export default EditProfile;