"use client"

import Link from 'next/link'

import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/common/Button'
import { TextField } from '@/components/common/Fields'
import { LoginUser } from '@/services/userService'
import { redirect } from 'next/navigation';
import { useState } from 'react'
import { useRouter } from 'next/navigation';



export default function Login() {

  const [error, setError] = useState(""); // State to store error message

  async function handleLogin(event) {
    event.preventDefault();
    setError(""); // Clear previous errors
  
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch('http://localhost:5223/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      console.log(response);
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }
  
      localStorage.setItem("accessToken", data.token); // Store refresh token in localStorage
      localStorage.setItem("userID", JSON.stringify(data.id)); 
      localStorage.setItem("emailVerify", JSON.stringify(data.emailVerified));
      localStorage.setItem("role", JSON.stringify(data.role));
      // console.log("local storage:", localStorage);
      // console.log("Login successful:", data);
      window.location.href = '/'; // Redirect after login
      if(data.emailVerified == false){
        console.error("Email not verified");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  }
  
  
  
  return (
    <AuthLayout
      title="Sign in to account"
      subtitle={
        <>
          Don’t have an account?{' '}
          <Link href="/register" className="text-cyan-600">
            Sign up
          </Link>{' '}
          for a free trial.
        </>
      }
    >
       <form onSubmit={handleLogin} method="post">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Show error message */}

        <div className="space-y-6">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-cyan-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Sign in to account
        </Button>
      </form>
      <div className="mt-10">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center"
          >
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm/6 font-medium">
            <span className="bg-white px-6 text-gray-900">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4">
          <a
            href="#"
            className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:ring-transparent"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path
                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                fill="#EA4335"
              />
              <path
                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                fill="#4285F4"
              />
              <path
                d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                fill="#FBBC05"
              />
              <path
                d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                fill="#34A853"
              />
            </svg>
            <span className="text-sm/6 font-semibold">Google</span>
          </a>
        </div>
      </div>
    </AuthLayout>
  )
}
