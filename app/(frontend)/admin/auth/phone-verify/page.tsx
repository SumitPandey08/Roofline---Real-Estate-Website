"use client";

import React, { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();

  const [phone, setPhone] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+1");
  const [step, setStep] = useState<"phone" | "verify">("phone");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [fullPhoneNo, setFullPhoneNo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const countryCodes = [
    { code: "+1", country: "🇺🇸" },
    { code: "+44", country: "🇬🇧" },
    { code: "+91", country: "🇮🇳" },
    { code: "+61", country: "🇦🇺" },
    { code: "+86", country: "🇨🇳" },
  ];

  // ---------------- SEND OTP ----------------
  const handleSendOTP = async (e?: FormEvent) => {
    e?.preventDefault?.();

    if (!phone.trim()) {
      setError("Please enter a valid phone number");
      return;
    }

    const fullNumber = `${countryCode}${phone}`;

    if (!/^\+?[1-9]\d{1,14}$/.test(fullNumber)) {
      setError("Invalid phone number format");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/phone-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNo: fullNumber }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Failed to send OTP");
        setLoading(false);
        return;
      }

      setFullPhoneNo(fullNumber);
      setSuccess("Verification code sent successfully");
      setStep("verify");
    } catch (err) {
      setError("Something went wrong. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- VERIFY OTP ----------------
  const handleVerifyCode = async (e: FormEvent) => {
    e.preventDefault();

    if (verificationCode.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/phone-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNo: fullPhoneNo,
          verificationCode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Invalid OTP");
        setLoading(false);
        return;
      }

      setSuccess("Phone verified successfully");

      setTimeout(() => {
        router.push("/admin/auth/register");
      }, 1500);
    } catch (err) {
      setError("Verification failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- RESEND OTP ----------------
  const handleResendOTP = async () => {
    if (loading) return;
    await handleSendOTP();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-100 p-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-purple-200/50 shadow-[0_20px_50px_rgba(139,_92,_246,_0.15)] flex flex-col items-center">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-purple-500 rounded-2xl mb-3">
            <Image src="/logo.webp" alt="logo" width={120} height={100} />
          </div>
          <p className="text-purple-600 text-xs uppercase tracking-wide">
            Trusted Real Estate Partner
          </p>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-slate-800">
          Phone Verification
        </h1>
        <p className="text-slate-500 text-sm mt-2 mb-6 text-center">
          We’ll send a secure OTP to verify your number
        </p>

        {/* Alerts */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm mb-3 text-center">{success}</p>
        )}

        {/* PHONE STEP */}
        {step === "phone" && (
          <div className="w-full space-y-4">
            <div className="flex">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-white/80 border border-purple-200 border-r-0 rounded-l-2xl p-3"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.country} {c.code}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/80 border border-purple-200 rounded-r-2xl p-3"
              />
            </div>

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-2xl"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* OTP STEP */}
        {step === "verify" && (
          <div className="w-full space-y-4">
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full bg-white/80 border border-purple-200 rounded-2xl p-3 text-center tracking-widest"
            />

            <button
              onClick={handleVerifyCode}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-2xl"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={handleResendOTP}
              disabled={loading}
              className="text-sm text-purple-600 hover:underline text-center w-full"
            >
              Resend OTP
            </button>
          </div>
        )}

        <p className="mt-8 text-xs text-slate-400 text-center">
          By continuing, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
};

export default Page;
