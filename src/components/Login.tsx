/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, KeyRound, Fingerprint, ArrowRight } from "lucide-react";
import { ScreenID } from "../types";

interface LoginProps {
  onNavigate: (screen: ScreenID) => void;
  onGoBack: () => void;
  onLoginSuccess: (email: string) => void;
  onAuthenticatePasskey: () => void;
}

export default function Login({ onNavigate, onGoBack, onLoginSuccess, onAuthenticatePasskey }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!password.trim() || password.length < 4) {
      setErrorMsg("Please enter your password.");
      return;
    }

    onLoginSuccess(email);
  };

  return (
    <div 
      className="flex flex-col h-full bg-brand-surface overflow-y-auto"
      id="login-screen"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-brand-outline-variant/30 sticky top-0 bg-brand-surface/90 backdrop-blur-md z-10">
        <button 
          onClick={onGoBack}
          className="p-1 rounded-lg hover:bg-brand-surface-container transition-colors cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-brand-primary" />
        </button>
        <span className="font-extrabold text-brand-primary tracking-tight text-sm uppercase">
          PrivacyHub
        </span>
        <div className="w-7 shadow-xs" />
      </div>

      {/* Main Container */}
      <div className="flex-1 px-6 py-10 space-y-8">
        
        {/* Title area */}
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-brand-primary font-sans">
            Welcome back
          </h2>
          <p className="text-brand-muted text-xs font-normal">
            Continue sharing with control.
          </p>
        </div>

        {/* Validation Errors */}
        {errorMsg && (
          <div className="p-3 text-xs font-semibold rounded-lg bg-red-50 text-brand-orange border border-brand-orange/30 animate-pulse">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-primary uppercase tracking-wide">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-brand-muted/70">
                <Mail className="w-4 h-4" />
              </span>
              <input 
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 text-xs bg-white border border-brand-outline-variant/60 rounded-xl focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-brand-dark placeholder:text-brand-muted/50 font-medium"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-brand-primary uppercase tracking-wide">
                Password
              </label>
              <button
                type="button"
                onClick={() => alert("Password reset trigger (Mockup: Check terminal ledger checks!)")}
                className="text-[11px] font-bold text-brand-secondary hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-brand-muted/70">
                <Lock className="w-4 h-4" />
              </span>
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3.5 text-xs bg-white border border-brand-outline-variant/60 rounded-xl focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-brand-dark placeholder:text-brand-muted/50 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-brand-muted/70 hover:text-brand-primary cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Log In Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-brand-primary text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-primary/90 transition-all cursor-pointer shadow-md mt-4 active:scale-98"
          >
            <span>Log In</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        {/* Visual OR Separator */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-brand-outline-variant/40"></div>
          <span className="flex-shrink mx-4 text-[10px] font-extrabold text-brand-muted uppercase tracking-widest">or</span>
          <div className="flex-grow border-t border-brand-outline-variant/40"></div>
        </div>

        {/* Passwordless Passkey & Biometric elements from screenshot */}
        <div className="space-y-4">
          <p className="text-center text-[11px] font-bold text-brand-muted uppercase tracking-wider">
            Secure Cryptographic Login
          </p>
          <div className="flex items-center justify-center space-x-4">
            
            {/* Key/Passkey pairing */}
            <button
              onClick={onAuthenticatePasskey}
              className="flex items-center justify-center w-14 h-14 rounded-full border border-brand-outline-variant hover:border-brand-primary hover:bg-brand-mint/20 text-brand-primary transition-all cursor-pointer shadow-xs active:scale-95"
              title="Authenticate via Passkey"
            >
              <KeyRound className="w-5 h-5 text-brand-primary" strokeWidth={2} />
            </button>

            {/* Secure Biometric Identity */}
            <button
              onClick={onAuthenticatePasskey}
              className="flex items-center justify-center w-14 h-14 rounded-full border border-brand-outline-variant hover:border-brand-primary hover:bg-brand-mint/20 text-brand-primary transition-all cursor-pointer shadow-xs active:scale-95"
              title="Authenticate via Biometric Key"
            >
              <Fingerprint className="w-5 h-5 text-brand-primary" strokeWidth={2} />
            </button>

          </div>
        </div>

        {/* Link back to Create Account */}
        <p className="text-center text-xs text-brand-muted font-medium pt-4">
          New to PrivacyHub?{" "}
          <button 
            type="button"
            onClick={() => onNavigate("signup")}
            className="text-brand-secondary font-bold hover:underline cursor-pointer"
          >
            Create account
          </button>
        </p>

      </div>
    </div>
  );
}
