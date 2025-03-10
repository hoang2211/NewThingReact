"use client"
import Link from 'next/link'

import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/common/Button'
import { SelectField, TextField } from '@/components/common/Fields'
import { useState } from 'react'

export default function ShipperRegister() {
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
        "requestedRole": "shipper"
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
          throw new Error(`Failed to request shipper role. Status: ${response.status}`);
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
      title="Sign up as a Shipper"
      subtitle={
        <>
          <div>🚚 Join Our Network of Reliable Shippers</div>
          <div>🌎 Delivering Excellence, One Package at a Time</div>
          <div>📦 Grow Your Logistics Business with Us</div>
        </>
      }
    >
      <form onSubmit={handleSubmit} method="post">
        <div className="grid grid-cols-2 gap-6">
          <TextField
            label="Company Name"
            name="company_name"
            type="text"
            autoComplete="organization"
            required
          />
          <TextField
            label="Contact Person"
            name="contact_person"
            type="text"
            autoComplete="name"
            required
          />
      
          <TextField
            className="col-span-full"
            label="Business Address"
            name="business_address"
            type="text"
            autoComplete="address-line1"
            required
          />
          <TextField
            className="col-span-full"
            label="Phone Number"
            name="phone_number"
            type="tel"
            autoComplete="tel"
            required
          />

          <SelectField
            className="col-span-full"
            label="Vehicle Type"
            name="vehicle_type"
            required
          >
            <option>Bike</option>
            <option>Van</option>
            <option>Truck</option>
            <option>Other</option>
          </SelectField>
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {success && <p className="mt-4 text-green-600">{success}</p>}

        <Button type="submit" color="cyan" className="mt-8 w-full" disabeled={loading}>
          {loading ? "Submitting..." : "Register as Shipper"}
        </Button>
      </form>
    </AuthLayout>
  )
}
