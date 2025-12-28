"use client";

import Link from 'next/link';
import React , {useState, useEffect} from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const SignUpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNoFromQuery = searchParams.get('phoneNo');

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    phoneNo: phoneNoFromQuery || ''
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (phoneNoFromQuery) {
      setUser(prevUser => ({ ...prevUser, phoneNo: phoneNoFromQuery }));
    }
  }, [phoneNoFromQuery]);

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.phoneNo) {
      setError("Phone number is missing. Please verify your phone first.");
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/users/signup', user);
      console.log("Signup success", response.data);
      router.push('/login');
    } catch (error: any) {
      setError(error.response?.data?.error || "An unexpected error occurred.");
      console.log("Signup failed", error.message);
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="max-w-md mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">
    <h1 className="text-2xl font-bold text-center text-blue-800 mb-8">Sign Up</h1>
    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    <form onSubmit={onSignUp} className="flex flex-col gap-6" aria-label="Sign Up Form">
      <div>
        <label htmlFor="signup-name" className="block mb-1 text-sm font-medium text-blue-700">
          Name
        </label>
        <input
          id="signup-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="w-full px-4 py-3 rounded-md border border-blue-200 focus:border-blue-500 focus:bg-blue-50 outline-none transition"
          placeholder="Enter your name"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="signup-email" className="block mb-1 text-sm font-medium text-blue-700">
          Email
        </label>
        <input
          id="signup-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full px-4 py-3 rounded-md border border-blue-200 focus:border-blue-500 focus:bg-blue-50 outline-none transition"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="signup-password" className="block mb-1 text-sm font-medium text-blue-700">
          Password
        </label>
        <input
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          className="w-full px-4 py-3 rounded-md border border-blue-200 focus:border-blue-500 focus:bg-blue-50 outline-none transition"
          placeholder="Create a password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="signup-phone" className="block mb-1 text-sm font-medium text-blue-700">
          Phone Number
        </label>
        <input
          id="signup-phone"
          name="phone"
          type="text"
          required
          className="w-full px-4 py-3 rounded-md border border-blue-200 bg-gray-100 outline-none transition"
          value={user.phoneNo}
          readOnly
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-900 transition shadow"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
    <Link href="/login" className="block text-center mt-6 text-blue-700 hover:underline text-sm">
      Already have an account? Login
    </Link>
  </div>
);
}

export default SignUpPage  ;
