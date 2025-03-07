"use client";
import { useEffect, useState } from 'react';

export default function UserProfile() {
  const userId = 12; // Replace with dynamic ID if needed
  const [user, setUser] = useState({
    username: '',
    fullName: '',
    phone: '',
    email: '',
    country: '',
    street: '',
    city: '',
    region: '',
    postalCode: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch(`localhost:5223/api/User/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchUserProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('localhost:5223/api/User/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error('Update failed');

      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="space-y-6 px-6">
      {/* Edit Button */}
      <button
        type="button"
        onClick={toggleEdit}
        className="mb-4 bg-blue-600 px-3 py-2 text-white rounded-md hover:bg-blue-500"
      >
        {isEditing ? 'Cancel' : 'Edit Profile'}
      </button>

      {/* User Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-sm rounded-md p-6 space-y-6">
          <h3 className="text-lg font-semibold">Personal Information</h3>

          <div className="grid grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                name="username"
                value={user.username}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                name="phone"
                value={user.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium">Country</label>
              <select
                name="country"
                value={user.country}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md bg-gray-100"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium">Street</label>
              <input
                name="street"
                value={user.street}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">City</label>
              <input
                name="city"
                value={user.city}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Postal Code</label>
              <input
                name="postalCode"
                value={user.postalCode}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <button type="submit" className="bg-cyan-600 px-3 py-2 text-white rounded-md hover:bg-cyan-500">
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
