import React from 'react';
import NavigationBar from '../../components/navigationBar';
import Footer from '../../components/Footer';
import profileImg from '../../assets/profile.png'; 

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
    
      <NavigationBar />

      
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          
          <div className="flex flex-col items-center">
            <img
              src={profileImg}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-green-500 shadow-md"
            />
            <h1 className="text-2xl font-bold text-gray-800 mt-4">
              John Doe
            </h1>
            <p className="text-gray-500">Admin or supplier</p>
          </div>

          
          <div className="mt-8 space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Email</span>
              <span className="text-gray-600">john.doe@example.com</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Phone</span>
              <span className="text-gray-600">+94 77 123 4567</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Location</span>
              <span className="text-gray-600">Matara, Sri Lanka</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
              Edit Profile
            </button>
            <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
