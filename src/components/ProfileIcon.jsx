import React from 'react';
import { User } from 'lucide-react';

const ProfileIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 bg-green-700 text-white px-3 py-2 rounded-lg hover:bg-green-800 transition-colors"
    aria-label="Profile"
  >
    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
      <User className="w-5 h-5 text-white" />
    </div>
  </button>
);

// Usage example for ProfileIcon in your component:
// <ProfileIcon onClick={fetchProfile} />

// Display name and role in your UI
// {profile && (
//   <div>
//     <p>Name: {profile.name}</p>
//     <p>Role: {profile.role}</p>
//   </div>
// )}

export default ProfileIcon;
