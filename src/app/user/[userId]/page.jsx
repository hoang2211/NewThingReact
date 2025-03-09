"use client";
import { useEffect, useState } from "react";
import {
  PhotoIcon,
  UserCircleIcon as UserCircleIconSolid,
} from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

export default function UserProfile() {
  // State to store user data
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    address: ""
  });

  // State to store error message
  const [error, setError] = useState("");

  //State to check if user is editing profile
  const [isEditing, setIsEditing] = useState(false);

  //set user id and token for fetching user data     
  
  const userId = localStorage.getItem("userID");
  const token = localStorage.getItem("accessToken");

  // Function to split full name into first and last name parts to display in form
  const splitName = (fullName) => {
    if (!fullName) return { firstName: "", lastName: "" };
    const nameParts = fullName.trim().split(" ");
    return {
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(" "),
    };
  };

  //Function to censor email 
  const censorEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    return name.slice(0, 3) + "***********@" + domain;
  };

  //Function to censor phone number
  const censorPhone = (phone) => {
    if (!phone || phone.length < 6) return phone;
    return phone.slice(0, 2) + "***********" + phone.slice(-4);
  };


  //Fetch user data from API using header token authenticate and set user data
  useEffect(() => {
    async function fetchUserProfile() {
      if (!userId || !token) {
        console.error("UserID or token is missing!");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5223/api/User/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();
        const { firstName, lastName } = splitName(data.fullName);
        setUser({ ...data, firstName, lastName });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    if (userId) {
      fetchUserProfile();
    }
  }, [userId, token]);

  // // Function to handle form input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (new Date(user.birthday) > new Date()) {
      setError("Birthday cannot be in the future.");
      return;
    }
  
    if (!userId || !token) {
      console.error("UserID or token is missing!");
      return;
    }
  
    // ✅ Ensure `fullName` is set properly
    const updatedUser = {
      userId: userId,  // Ensure userId is included
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      gender: user.gender,
      phone: user.phone,
      address: user.address,
      birthday: user.birthday ? user.birthday : null, // ✅ Ensure birthday is valid or null
      imgProfile: user.imgProfile,
    };
    
    try {
      const response = await fetch(`http://localhost:5223/api/User/update-profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ command: updatedUser }), // ✅ Wrap inside `command`
      });
  
      const responseText = await response.text();
      console.log("Response Status:", response.status);
      console.log("Response Body:", responseText);
      console.log("Response Headers:", response.headers);
      console.log("Response :", response);
  
      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.status} - ${responseText}`);
      }
  
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
     

  return (
    <div className="space-y-6 px-6">


      {/* Profile Information */}
      <form onSubmit={handleSubmit} method="put">
        <div className="shadow-sm sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
            <h3 className="text-base font-semibold text-gray-900">Profile</h3>
            <p className="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
            <input type="hidden" name="dayInWeek" value={user.dayInWeek || ""} />
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setIsEditing(!isEditing)} className={`rounded-md px-3 py-2 font-semibold ${isEditing ? "bg-gray-300 text-gray-600" : "bg-blue-500 text-white"}`}>
                {isEditing ? "Cancel" : "Edit"}
              </button>
              <button type="submit" disabled={!isEditing} className={`rounded-md px-3 py-2 font-semibold ${isEditing ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"}`}>
                Save
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-500">Username</label>
                <div className="mt-2">
                <input name="username" type="text" value={user.username || ""} onChange={handleChange} disabled={!isEditing} className="input-field w-full" />
                </div>
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-500">Photo</label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIconSolid className="size-12 text-gray-300" />
                  <button type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                    Change
                  </button>
                </div>
              </div>
            </div>


            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">First name</label>
                <input name="firstName" type="text" value={user.firstName || ""} readOnly className="input-field w-full" />
                </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Last name</label>
                <input name="lastName" type="text" value={user.lastName || ""} readOnly className="input-field w-full" />
                </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Email address</label>
                <input name="email" type="email" value={
                  // censorEmail
                  (user.email) || ""} readOnly className="input-field w-full" />
                </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone</label>
                <input name="phone" type="text" value={
                  // censorPhone
                  (user.phone) || ""} readOnly className="input-field w-full" />
                </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Birthday</label>
                <input name="birthday" type="date" value={user.birthday || ""} onChange={handleChange} disabled={!isEditing} className="input-field w-full" />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Address</label>
                <input name="address" type="text" value={user.address || ""} onChange={handleChange} disabled={!isEditing} className="input-field w-full" />
                </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
