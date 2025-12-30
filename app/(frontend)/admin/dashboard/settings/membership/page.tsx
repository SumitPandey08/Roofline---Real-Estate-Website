"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaShieldAlt, FaBolt, FaCrown, FaCheckCircle, FaRocket } from 'react-icons/fa'; // React Icons
import { MdVerified } from 'react-icons/md';

interface UserData {
  membership: 'basic' | 'advance' | 'pro';
  uploadCredit: number;
  membershipLastDate: string;
}

export default function MembershipPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserMembership();
  }, []);

  const fetchUserMembership = async () => {
    try {
      const res = await axios.get('/api/admin/me');
      setUser(res.data.data);
    } catch (error) {
      console.error("Failed to fetch membership data");
      // Fallback for dev/demo if API fails
      // setUser({ membership: 'basic', uploadCredit: 5, membershipLastDate: new Date().toISOString() });
    }
  };

  const handleUpgrade = async (plan: string) => {
    if (!confirm(`Are you sure you want to upgrade to ${plan}?`)) return;
    
    setLoading(true);
    try {
      const res = await axios.post('/api/admin/buy-premium', { membership: plan });
      
      if (res.data.success) {
        toast.success(`Successfully upgraded to ${plan}!`);
        fetchUserMembership(); 
      } else if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Upgrade failed");
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      id: 'basic',
      name: 'Basic Starter',
      price: 'Free',
      period: '/forever',
      credits: 5,
      icon: <FaShieldAlt className="w-8 h-8 text-gray-500" />,
      features: ['5 Property Listings/mo', 'Standard Visibility', 'Basic Support', 'Community Access'],
      theme: 'gray',
      popular: false
    },
    {
      id: 'advance',
      name: 'Advance Growth',
      price: '$29',
      period: '/month',
      credits: 15,
      icon: <FaBolt className="w-8 h-8 text-blue-500" />,
      features: ['50 Property Listings/mo', 'Verified Agent Badge', 'Priority Email Support', 'Analytics Dashboard', 'No Ads'],
      theme: 'blue',
      popular: true // Highlight this plan
    },
    {
      id: 'pro',
      name: 'Pro Business',
      price: '$99',
      period: '/month',
      credits: 30,
      icon: <FaCrown className="w-8 h-8 text-yellow-500" />,
      features: ['1000 Property Listings/mo', 'Top Search Placement', 'Dedicated Account Manager', '24/7 Phone Support', 'Featured Listings'],
      theme: 'yellow',
      popular: false
    }
  ];

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      <div className="animate-pulse flex flex-col items-center">
         <div className="h-4 w-4 bg-blue-500 rounded-full mb-2 animate-bounce"></div>
         Loading your membership details...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Upgrade your capabilities</h1>
          <p className="text-lg text-gray-600">Choose the plan that fits your real estate journey.</p>
        </div>

        {/* Current Status Dashboard Card */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FaRocket className="w-32 h-32 text-blue-600" />
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center relative z-10 gap-6">
            <div className="flex items-center gap-6">
              <div className="bg-blue-100 p-4 rounded-full">
                {user.membership === 'pro' ? <FaCrown className="w-8 h-8 text-yellow-500" /> : 
                 user.membership === 'advance' ? <FaBolt className="w-8 h-8 text-blue-500" /> :
                 <FaShieldAlt className="w-8 h-8 text-gray-500" />}
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Current Subscription</p>
                <div className="flex items-center gap-2">
                    <h2 className="text-3xl font-bold text-gray-900 capitalize">{user.membership} Plan</h2>
                    {user.membership !== 'basic' && <MdVerified className="text-blue-500 w-6 h-6" />}
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  Valid until: <span className="font-medium text-gray-700">{new Date(user.membershipLastDate).toLocaleDateString()}</span>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-5 rounded-xl shadow-lg min-w-[160px] text-center transform transition-transform hover:-translate-y-1">
                    <p className="text-4xl font-bold">{user.uploadCredit}</p>
                    <p className="text-xs text-blue-100 font-medium uppercase mt-1">Credits Balance</p>
                </div>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isCurrent = user.membership === plan.id;
            const isPopular = plan.popular;

            return (
              <div 
                key={plan.id} 
                className={`
                  relative flex flex-col bg-white rounded-2xl transition-all duration-300
                  ${isPopular ? 'shadow-2xl ring-2 ring-blue-500 scale-105 z-10' : 'shadow-lg border border-gray-100 hover:shadow-xl'}
                  ${isCurrent ? 'bg-blue-50/50 border-blue-200' : ''}
                `}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                    MOST POPULAR
                  </div>
                )}

                {/* Current Badge */}
                {isCurrent && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                    <FaCheckCircle /> ACTIVE
                  </div>
                )}

                <div className="p-8 flex-1">
                  <div className="mb-4">
                      {plan.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 text-sm font-medium">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 font-medium">Includes {plan.credits} Credits</p>

                  <div className="my-6 border-t border-gray-100"></div>

                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                        <FaCheckCircle className={`w-5 h-5 mt-0.5 shrink-0 ${isPopular ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 pt-0 mt-auto">
                  <button
                    onClick={() => !isCurrent && handleUpgrade(plan.id)}
                    disabled={isCurrent || loading}
                    className={`
                      w-full py-3 px-6 rounded-xl font-bold text-sm transition-all duration-200
                      ${isCurrent 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : isPopular 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:from-blue-700 hover:to-indigo-700' 
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                      }
                    `}
                  >
                    {isCurrent ? 'Current Plan' : loading ? 'Processing...' : 'Upgrade Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center text-gray-500 text-sm">
            <p>Need a custom enterprise plan? <a href="#" className="text-blue-600 font-medium underline">Contact Sales</a></p>
        </div>
      </div>
    </div>
  );
}