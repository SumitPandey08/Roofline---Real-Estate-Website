"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 

const OtpVerify = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6-digit OTP
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [phoneNo, setPhoneNo] = useState(''); // To store phone number from cookie or local storage

    useEffect(() => {
        // In a real app, you'd get the phone number from a cookie or local storage
        // that was set after the phone-verify step. For now, we'll assume it's available.
        // This is a placeholder. You might need to adjust how phoneNo is retrieved.
        const storedPhoneNo = localStorage.getItem('admin-phone-to-verify'); 
        if (storedPhoneNo) {
            setPhoneNo(storedPhoneNo);
        } else {
            // If phone number is not found, redirect back to phone verification
            router.push('/admin/auth/phone-verify');
        }
    }, [router]);

    // Handle input change
    const handleChange = (value: string, index: number) => {
        if (isNaN(Number(value))) return; // Only allow numbers

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle backspace
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setSuccessMessage('');
        const enteredOtp = otp.join('');

        if (enteredOtp.length !== 6) {
            setError('Please enter a 6-digit OTP.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/admin/phone-verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNo, verificationCode: enteredOtp }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'OTP verification failed');
            }

            setSuccessMessage(data.message || 'Phone number verified successfully!');
            localStorage.removeItem('admin-phone-to-verify'); // Clear stored phone number
            router.push('/admin/auth/register'); // Redirect to registration

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('/api/admin/phone-verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNo }), // Request new code for this phone number
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to resend OTP');
            }

            setSuccessMessage(data.message || 'New OTP sent!');
            // Clear OTP input fields
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-100 p-4">
            
            <div className="w-full max-w-md p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-purple-200/50 shadow-[0_20px_50px_rgba(139,_92,_246,_0.15)] flex flex-col items-center">
                
                {/* Header Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="p-3 bg-purple-500 rounded-2xl shadow-sm mb-4">
                        <Image src="/logo.webp" alt="logo" width={120} height={100} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Verify Code</h1>
                    <p className="text-slate-500 mt-2 text-sm text-center">
                        We sent a 6-digit code to {phoneNo || 'your phone'}. <br/>
                        <Link href="/admin/auth/phone-verify"> <span className="text-purple-600 font-semibold cursor-pointer hover:underline">Edit number</span></Link>
                    </p>
                </div>

                {/* OTP Inputs Group */}
                <div className="flex gap-4 mb-8">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            ref={(el) => (inputRefs.current[index] = el)}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-14 h-16 text-center text-2xl font-bold bg-white/80 border-2 border-purple-100 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-slate-800 shadow-inner"
                            disabled={loading}
                        />
                    ))}
                </div>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm text-center mb-4">{successMessage}</p>}

                {/* Actions */}
                <div className="w-full space-y-4">
                    <button 
                        onClick={handleSubmit} 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-purple-200 transform transition-all active:scale-[0.98] hover:shadow-xl disabled:bg-purple-400"
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Verify & Proceed'}
                    </button>
                    
                    <div className="text-center">
                        <p className="text-sm text-slate-500">
                            Didn't receive the code? 
                            <button 
                                onClick={handleResendOtp} 
                                className="ml-1 text-purple-600 font-bold hover:text-purple-800 transition-colors disabled:text-purple-300"
                                disabled={loading}
                            >
                                {loading ? 'Resending...' : 'Resend'}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Security Note */}
                <div className="mt-8 flex items-center gap-2 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-xs uppercase tracking-widest font-medium">Secure Encryption</span>
                </div>
            </div>
        </div>
    );
};

export default OtpVerify;
