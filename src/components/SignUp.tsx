/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import { ScreenID, TrustEvent } from "../types";

interface SignUpProps {
  onNavigate: (screen: ScreenID) => void;
  onGoBack: () => void;
  onSignUpSuccess: (username: string, email: string) => void;
}

export default function SignUp({ onNavigate, onGoBack, onSignUpSuccess }: SignUpProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!username.trim()) {
      setErrorMsg("Please enter a username.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!password.trim() || password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }
    if (!agreePolicy) {
      setErrorMsg("You must read and agree to the Privacy Policy.");
      return;
    }
    if (!agreeTerms) {
      setErrorMsg("You must accept the Terms & Conditions.");
      return;
    }

    // Success triggers App State user injection and consent logs
    onSignUpSuccess(username, email);
  };

  return (
    <div 
      className="flex flex-col h-full bg-brand-surface overflow-y-auto"
      id="signup-screen"
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
        <div className="w-7 shadow-xs" /> {/* Visual balance spacer */}
      </div>

      {/* Main Container */}
      <div className="flex-1 px-6 py-8 space-y-6">
        
        {/* Title area */}
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-brand-primary font-sans">
            Create your account
          </h2>
          <p className="text-brand-muted text-xs font-normal">
            We only ask for what we need.
          </p>
        </div>

        {/* Validation Errors */}
        {errorMsg && (
          <div className="p-3 text-xs font-semibold rounded-lg bg-red-50 text-brand-orange border border-brand-orange/30 animate-pulse">
            {errorMsg}
          </div>
        )}

        {/* Input Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-primary uppercase tracking-wide">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-brand-muted/70">
                <User className="w-4 h-4" />
              </span>
              <input 
                type="text"
                placeholder="yourname"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ""))}
                className="w-full pl-11 pr-4 py-3 text-xs bg-white border border-brand-outline-variant/60 rounded-xl focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-brand-dark placeholder:text-brand-muted/50 font-medium"
              />
            </div>
          </div>

          {/* Email Input */}
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
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-xs bg-white border border-brand-outline-variant/60 rounded-xl focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-brand-dark placeholder:text-brand-muted/50 font-medium"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-primary uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-brand-muted/70">
                <Lock className="w-4 h-4" />
              </span>
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3 text-xs bg-white border border-brand-outline-variant/60 rounded-xl focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-brand-dark placeholder:text-brand-muted/50 font-medium"
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

          {/* Commitment green alert container */}
          <div className="flex items-start space-x-3 p-4 bg-brand-mint/20 border border-brand-mint/50 rounded-xl">
            <ShieldCheck className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="text-[11px] font-extrabold text-brand-primary tracking-wide uppercase">
                Ethical Privacy Commitment
              </h5>
              <p className="text-[11px] text-brand-muted font-medium leading-relaxed">
                We do not sell your data. You can delete your account anytime.
              </p>
            </div>
          </div>

          {/* Consent Checkboxes */}
          <div className="space-y-3 pt-2">
            
            {/* Agreement 1 */}
            <label className="flex items-start space-x-3 cursor-pointer select-none">
              <input 
                type="checkbox"
                checked={agreePolicy}
                onChange={(e) => setAgreePolicy(e.target.checked)}
                className="mt-1 w-4 h-4 rounded-md border-brand-outline-variant text-brand-primary focus:ring-brand-primary cursor-pointer accent-brand-secondary"
              />
              <span className="text-xs text-brand-muted font-medium">
                I agree to the{" "}
                <button 
                  type="button" 
                  onClick={() => onNavigate("privacy_policy")} 
                  className="text-brand-secondary underline font-bold hover:text-brand-primary inline cursor-pointer"
                >
                  Privacy Policy
                </button>
              </span>
            </label>

            {/* Agreement 2 */}
            <label className="flex items-start space-x-3 cursor-pointer select-none">
              <input 
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded-md border-brand-outline-variant text-brand-primary focus:ring-brand-primary cursor-pointer accent-brand-secondary"
              />
              <span className="text-xs text-brand-muted font-medium">
                I accept the{" "}
                <button 
                  type="button" 
                  onClick={() => onNavigate("terms_conditions")} 
                  className="text-brand-secondary underline font-bold hover:text-brand-primary inline cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </span>
            </label>

          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-brand-primary text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-primary/90 transition-all cursor-pointer shadow-md mt-6 active:scale-98"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        {/* Redirect to Login */}
        <p className="text-center text-xs text-brand-muted font-medium pt-2">
          Already have an account?{" "}
          <button 
            type="button"
            onClick={() => onNavigate("login")}
            className="text-brand-secondary font-bold hover:underline cursor-pointer"
          >
            Log in
          </button>
        </p>

      </div>
    </div>
  );
}
