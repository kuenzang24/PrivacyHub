/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Sparkles, Hash, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ScreenID } from "../types";

interface OnboardingProps {
  onNavigate: (screen: ScreenID) => void;
}

export default function Onboarding({ onNavigate }: OnboardingProps) {
  return (
    <div 
      className="flex flex-col h-full bg-brand-surface overflow-y-auto"
      id="onboarding-screen"
    >
      {/* Mini App Bar */}
      <div className="flex items-center space-x-2 px-6 py-4 border-b border-brand-outline-variant/30 sticky top-0 bg-brand-surface/90 backdrop-blur-md z-10">
        <Shield className="w-5 h-5 text-brand-primary" strokeWidth={2.5} />
        <span className="font-extrabold text-brand-primary tracking-tight font-sans text-base">
          PrivacyHub
        </span>
      </div>

      {/* Main Content Scroll wrapper */}
      <div className="flex-1 px-6 pt-6 pb-8 space-y-6">
        
        {/* Editorial Heading */}
        <div className="space-y-3 text-center md:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-brand-primary font-sans leading-tight">
            Social media that <br className="hidden sm:inline" /> respects your privacy.
          </h2>
          <p className="text-brand-muted text-sm font-normal leading-relaxed">
            Share moments, connect with others, and stay in control of your data.
          </p>
        </div>

        {/* Feature Cards Column */}
        <div className="space-y-4">
          
          {/* Card 1: Privacy by default */}
          <motion.div 
            className="flex items-start space-x-4 p-4 rounded-xl border border-brand-outline-variant/40 bg-white shadow-xs"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-brand-mint/40 text-brand-primary">
              <Shield className="w-5 h-5" strokeWidth={2} />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                Privacy by default
              </h4>
              <p className="text-xs text-brand-muted font-medium">
                Your profile and data are protected from the start.
              </p>
            </div>
          </motion.div>

          {/* Card 2: AI for safety */}
          <motion.div 
            className="flex items-start space-x-4 p-4 rounded-xl border border-brand-outline-variant/40 bg-white shadow-xs"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-brand-mint/40 text-brand-primary">
              <Sparkles className="w-5 h-5" strokeWidth={2} />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                AI for safety
              </h4>
              <p className="text-xs text-brand-muted font-medium">
                Helpful AI warnings protect you from sharing sensitive information.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Blockchain-style trust */}
          <motion.div 
            className="flex items-start space-x-4 p-4 rounded-xl border border-brand-outline-variant/40 bg-white shadow-xs"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-brand-mint/40 text-brand-primary">
              <Hash className="w-5 h-5 text-brand-secondary" strokeWidth={2.5} />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                Blockchain-style trust
              </h4>
              <p className="text-xs text-brand-muted font-medium">
                Consent changes and content proofs are recorded transparently.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Wave Artwork Mockup from the Wireframe */}
        <div className="rounded-2xl border border-brand-outline-variant/50 overflow-hidden bg-white shadow-xs p-3">
          <div className="relative h-44 rounded-xl bg-gradient-to-br from-[#123C3A] via-[#2A6559] to-[#D5EAE2] overflow-hidden">
            {/* Elegant SVG organic layers */}
            <svg viewBox="0 0 400 200" className="absolute bottom-0 w-full h-full opacity-90" preserveAspectRatio="none">
              <path 
                d="M0,130 C120,180 180,90 280,140 C340,170 380,110 400,105 L400,200 L0,200 Z" 
                fill="#aeedd5" 
                opacity="0.7" 
              />
              <path 
                d="M0,100 C100,60 220,160 300,90 C360,40 380,120 400,130 L400,200 L0,200 Z" 
                fill="#2c6956" 
                opacity="0.85" 
              />
              <path 
                d="M0,150 C150,110 250,180 400,120 L400,200 L0,200 Z" 
                fill="#fcf9f8" 
                opacity="0.95" 
              />
            </svg>
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/10 pointer-events-none" />
          </div>
        </div>

        {/* CTA Actions */}
        <div className="space-y-4 pt-2">
          <button 
            onClick={() => onNavigate("signup")}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-brand-primary-container text-brand-mint font-bold text-xs uppercase tracking-wider hover:bg-brand-primary hover:text-white transition-all cursor-pointer shadow-md shadow-brand-primary-container/10 active:scale-98"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-xs text-brand-muted font-medium">
            Already have an account?{" "}
            <button 
              onClick={() => onNavigate("login")}
              className="text-brand-secondary font-bold hover:underline cursor-pointer"
            >
              Log in
            </button>
          </p>
        </div>

        {/* Onboarding Footer */}
        <div className="pt-8 border-t border-brand-outline-variant/20 space-y-3 text-center">
          <p className="text-[10px] text-brand-muted/70 font-semibold tracking-wide">
            © 2026 PrivacyHub. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-3 text-[11px] font-bold text-brand-muted">
            <button onClick={() => onNavigate("privacy_policy")} className="hover:text-brand-primary hover:underline cursor-pointer">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => onNavigate("terms_conditions")} className="hover:text-brand-primary hover:underline cursor-pointer">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => onNavigate("trust_log")} className="hover:text-brand-primary hover:underline cursor-pointer">
              Trust Center
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
