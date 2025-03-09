"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Use client-side navigation
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/common/Button";
import { TextField } from "@/components/common/Fields";

export default function Register() {
  const [error, setError] = useState("");
  const router = useRouter(); // ✅ Initialize useRouter

  async function handleRegister(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5223/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // ✅ Check if response is valid JSON before parsing
      const text = await response.text();
      let responseData;
      try {
        responseData = text ? JSON.parse(text) : {};
      } catch {
        responseData = { message: "Invalid response from server." };
      }

      if (!response.ok) {
        setError(responseData.message || "Registration failed.");
        return;
      }

      // ✅ Redirect after successful registration
      router.push("/login"); // Use router.push instead of redirect()
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  }

  return (
    <AuthLayout
      title="Sign up for an account"
      subtitle={
        <>
          Already registered?{" "}
          <Link href="/login" className="text-cyan-600">
            Sign in
          </Link>{" "}
          to your account.
        </>
      }
    >
      <form onSubmit={handleRegister} method="post">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="grid grid-cols-2 gap-6">
          <TextField label="Full name" name="fullName" type="text" required />
          <TextField label="Phone" name="phone" type="text" required />
          <TextField className="col-span-full" label="Email address" name="email" type="email" required />
          <TextField className="col-span-full" label="Username" name="username" required />
          <TextField className="col-span-full" label="Password" name="password" type="password" required />
          <TextField className="col-span-full" label="Re-enter Password" name="confirmPassword" type="password" required />
        </div>
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Get started today
        </Button>
      </form>
    </AuthLayout>
  );
}
