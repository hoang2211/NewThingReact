"use client";
import Link from "next/link";
import { useState } from "react";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/common/Button";
import { TextField } from "@/components/common/Fields";

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleForgotPassword(event) {
    event.preventDefault();
    setMessage(""); // Reset message
    setIsError(false);

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    console.log(userData);
    try {
      const response = await fetch(
        "http://localhost:5223/api/Auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage("A password reset link has been sent to your email.");
        setIsError(false);
      } else {
        setMessage("Invalid email. Please check and try again.");
        setIsError(true);
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setMessage("Invalid email. Please check and try again.");
      setIsError(true);
    } finally {
      console.log("Request completed.");
    }
  }

  return (
    <AuthLayout
      title="Password reset"
      subtitle={
        <>
          Don’t have an account?{" "}
          <Link href="/register" className="text-cyan-600">
            Sign up
          </Link>{" "}
          for a free trial.
        </>
      }
    >
      <form onSubmit={handleForgotPassword} method="post">
        <div className="space-y-6">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          {message && (
            <p className={isError ? "text-red-500" : "text-green-600"}>
              {message}
            </p>
          )}
        </div>
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Send reset password request
        </Button>
      </form>
    </AuthLayout>
  );
}
