"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const monthlyInterestRate = interestRate / (12 * 100);
    const numberOfPayments = loanTenure * 12;
    
    if (loanAmount > 0 && interestRate > 0 && loanTenure > 0) {
      const emiValue =
        (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      
      setEmi(Math.round(emiValue));
      setTotalInterest(Math.round(emiValue * numberOfPayments - loanAmount));
    }
  }, [loanAmount, interestRate, loanTenure]);

  const totalPayment = loanAmount + totalInterest;
  const interestRatio = (totalInterest / totalPayment) * 100;

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Mortgage & EMI Calculator</h2>
          <p className="text-slate-500 font-medium">Plan your finances with precision and clarity.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* INPUTS SECTION */}
          <div className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
            <div className="space-y-10">
              {/* Loan Amount Slider */}
              <CalculatorSlider
                label="Loan Amount"
                value={loanAmount}
                min={100000}
                max={100000000}
                step={100000}
                unit="₹"
                onChange={setLoanAmount}
              />

              {/* Interest Rate Slider */}
              <CalculatorSlider
                label="Interest Rate"
                value={interestRate}
                min={1}
                max={20}
                step={0.1}
                unit="%"
                onChange={setInterestRate}
              />

              {/* Tenure Slider */}
              <CalculatorSlider
                label="Loan Tenure"
                value={loanTenure}
                min={1}
                max={30}
                step={1}
                unit="Yrs"
                onChange={setLoanTenure}
              />
            </div>
          </div>

          {/* RESULTS SECTION */}
          <div className="bg-slate-900 rounded-[32px] p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl">
            {/* Visual background element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />

            <div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Monthly EMI</p>
              <h3 className="text-5xl font-black mb-8">
                ₹{emi.toLocaleString("en-IN")}
              </h3>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Principal Amount</span>
                  <span className="font-bold">₹{loanAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Total Interest</span>
                  <span className="font-bold text-rose-400">₹{totalInterest.toLocaleString("en-IN")}</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Total Payable</span>
                  <span className="font-bold text-xl text-blue-400">₹{totalPayment.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Interest Ratio Visualizer */}
            <div className="mt-10">
               <div className="flex justify-between text-xs font-bold mb-2">
                  <span>PRINCIPAL</span>
                  <span>INTEREST</span>
               </div>
               <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden flex">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${100 - interestRatio}%` }}
                    className="h-full bg-blue-500" 
                  />
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${interestRatio}%` }}
                    className="h-full bg-rose-500" 
                  />
               </div>
               <p className="text-[10px] text-slate-500 mt-4 text-center italic">
                 Calculated based on reducing balance method.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- HELPER COMPONENTS ---------------- */

const CalculatorSlider = ({ label, value, min, max, step, unit, onChange }: any) => {
  return (
    <div className="group">
      <div className="flex justify-between items-end mb-4">
        <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">{label}</label>
        <div className="flex items-baseline">
          <span className="text-2xl font-black text-slate-900">
            {unit === "₹" ? `₹${value.toLocaleString("en-IN")}` : `${value}${unit}`}
          </span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all"
      />
      <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-300">
        <span>{unit === "₹" ? `₹${min.toLocaleString()}` : `${min}${unit}`}</span>
        <span>{unit === "₹" ? `₹${max.toLocaleString()}` : `${max}${unit}`}</span>
      </div>
    </div>
  );
};

export default EMICalculator;