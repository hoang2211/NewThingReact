"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/common/Button";
import { TextField } from "@/components/common/Fields";

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!token) {
            setStatus("Invalid or missing token.");
            return;
        }
        if (password !== confirmPassword) {
            setStatus("Passwords do not match.");
            return;
        }

        setStatus("");
        setLoading(true);

        try {
            const requestBody = {
                token: token,
                newPassword: password, // ✅ Corrected field name
            };

            console.log("Sending request to reset password:", requestBody);

            const response = await fetch("http://localhost:5223/api/Auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            const responseText = await response.text();
            console.log("API Response:", responseText);

            if (response.ok) {
                setStatus("Password has been reset successfully!");
                setTimeout(() => router.push("/login"), 5000);
            } else {
                setStatus("Failed to reset password. The token may be invalid or expired.");
            }
        } catch (error) {
            setStatus("An error occurred while resetting your password.");
            console.error("Reset password error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Reset Password"
            subtitle={
                <>
                    Remembered your password?{" "}
                    <Link href="/login" className="text-cyan-600">
                        Log in
                    </Link>
                </>
            }
        >
            <form onSubmit={handleResetPassword} className="space-y-6" method="post">
                <TextField
                    label="New Password"
                    name="newPassword"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {status && <p className="text-red-500">{status}</p>}

                <Button type="submit" color="cyan" className="mt-8 w-full" disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                </Button>
            </form>
        </AuthLayout>
    );
}
