"use client";
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/common/Button';

export default function VerifyEmail() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');
    const [status, setStatus] = useState('Verifying...');

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setStatus('Invalid or missing token.');
                return;
            }

            try {
                const response = await fetch(`http://localhost:5223/api/Auth/verify-email?token=${token}`, {
                    method: 'GET',
                });

                if (response.ok) {
                    setStatus('Email has been successfully verified!');
                
                } else {
                    setStatus('Verification failed. The token may be invalid or expired.');
                }
            } catch (error) {
                setStatus('An error occurred while verifying your email.');
                console.error('Verification error:', error);
            }
        };

        verifyEmail();
    }, [token, router]);

    return (
        <AuthLayout
            title="Verify Email"
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
            <div className="space-y-6">
                <h1>{status}</h1>
            </div>
            <Button onClick={() => router.push('/')} color="cyan" className="mt-8 w-full">
                Return to Home Page
            </Button>
        </AuthLayout>
    );
}
