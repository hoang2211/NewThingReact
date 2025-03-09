'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/common/Button'
import { SelectField, TextField } from '@/components/common/Fields'

export default function SellerRegister() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
  
    const userId = parseInt(localStorage.getItem("userID"), 10);
    const token = localStorage.getItem("accessToken");
  
    if (!userId || isNaN(userId) || !token) {
      setError("Authentication required. Please log in.");
      setLoading(false);
      return;
    }
  
    const requestData = {
      "userId": userId,
      "requestedRole": "seller"
    };
  
    try {
      const response = await fetch("http://localhost:5223/api/User/request-role-change", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error(`Failed to request seller role. Status: ${response.status}`);
      }
  
      setSuccess("Your request has been sent successfully! Please wait for approval.");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <AuthLayout
      title="Sign up as a Seller"
      subtitle={
        <>
          <div>🚀 Expanding to Become a Global Brand</div>
          <div>🛍️ Empowering Sellers, Elevating Shopping Experiences</div>
          <div>📈 Your Business, Our Priority</div>
        </>
      }
    >
      <form onSubmit={handleSubmit} method='post'>
        <div className="grid grid-cols-2 gap-6">
          <TextField label="Store Name" name="store_name" type="text" required />
          <TextField label="Owner Name" name="owner_name" type="text" required />
          <TextField className="col-span-full" label="Store Address" name="store_address" type="text" required />
          <TextField className="col-span-full" label="Phone Number" name="phone_number" type="tel" required />
          <SelectField className="col-span-full" label="Business Category" name="business_category" required>
            <option>Clothing & Fashion</option>
            <option>Electronics</option>
            <option>Home & Furniture</option>
            <option>Health & Beauty</option>
            <option>Food & Beverage</option>
            <option>Other</option>
          </SelectField>
        </div>

        {error && <p className="mt-4 text-red-500">{error}</p>}
        {success && <p className="mt-4 text-green-600">{success}</p>}

        <Button type="submit" color="cyan" className="mt-8 w-full" disabled={loading}>
          {loading ? "Submitting..." : "Register as Seller"}
        </Button>
      </form>
    </AuthLayout>
  )
}
