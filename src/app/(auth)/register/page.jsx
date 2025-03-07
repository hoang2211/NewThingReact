"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/common/Button";
import { TextField } from "@/components/common/Fields";
import { redirect } from "next/navigation";

export default function Register() {
  const [error, setError] = useState("");

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

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed.");
        return;
      }

      redirect("/login");
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
          Already registered? {" "}
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
