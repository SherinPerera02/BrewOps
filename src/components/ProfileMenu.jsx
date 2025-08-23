import React from 'react';

function ProfileMenu({ profile }) {
  if (!profile) return null;
  return (
    <div className="p-4">
      <p className="text-lg font-semibold">Name: {profile.name}</p>
      <p className="text-sm text-gray-600">Role: {profile.role}</p>
      {/* Add more profile info as needed */}
    </div>
  );
}

export default ProfileMenu;
