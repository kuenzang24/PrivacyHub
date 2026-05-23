/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowLeft, ChevronDown, Shield, Mail, CheckCircle2, Lock, Sparkles, BookOpen } from "lucide-react";
import { ScreenID } from "../types";

interface PrivacyPolicyProps {
  onGoBack: () => void;
}

export default function PrivacyPolicy({ onGoBack }: PrivacyPolicyProps) {
  const [activeTab, setActiveTab] = useState<string | null>("collect");

  const toggleAccordion = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <div 
      className="flex flex-col h-full bg-brand-surface overflow-y-auto"
      id="privacy-policy-screen"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-brand-outline-variant/30 sticky top-0 bg-brand-surface/90 backdrop-blur-md z-10">
        <button 
          onClick={onGoBack}
          className="p-1 rounded-lg hover:bg-brand-surface-container transition-colors cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-brand-primary" />
        </button>
        <span className="font-extrabold text-brand-primary tracking-tight text-xs uppercase">
          LEGAL CONCORDANCE
        </span>
        <div className="w-7 shadow-xs" />
      </div>

      <div className="px-6 py-6 space-y-6 pb-20">
        
        {/* Title details */}
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-brand-primary font-sans">
            Privacy Policy
          </h2>
          <p className="text-xs text-brand-muted font-medium">
            Simple, clear, and transparent.
          </p>
        </div>

        {/* Commitment box */}
        <div className="flex items-start space-x-3.5 p-4.5 bg-brand-mint/20 border border-brand-mint/50 rounded-2xl">
          <CheckCircle2 className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-[11px] font-extrabold text-brand-primary uppercase tracking-wide">
              Human-Centric Design
            </h5>
            <p className="text-[11px] text-brand-muted font-medium leading-relaxed">
              This policy was written for humans, not lawyers. We prioritize your digital agency over engagement-hacking algorithms.
            </p>
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-3 font-sans">
          
          {/* Item 1: what we collect */}
          <div className="rounded-xl border border-brand-outline-variant/40 bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleAccordion("collect")}
              className="w-full flex items-center justify-between p-4 text-left font-bold text-xs text-brand-primary cursor-pointer hover:bg-brand-surface/50 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <BookOpen className="w-4 h-4 text-brand-secondary" />
                <span>What data we collect</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-brand-muted transition-transform ${activeTab === "collect" ? 'rotate-180 text-brand-primary' : ''}`} />
            </button>
            
            {activeTab === "collect" && (
              <div className="p-4 pt-1 border-t border-brand-surface-container font-medium text-[11px] text-brand-muted leading-relaxed space-y-2">
                <p>We process only basic details needed to operate your feed securely: your account name, active cryptographic profile metrics, and verified session identifiers.</p>
                <p className="font-bold text-brand-primary">No secondary data aggregators or hidden telemerics scripts are loaded on this page.</p>
              </div>
            )}
          </div>

          {/* Item 2: why we collect it */}
          <div className="rounded-xl border border-brand-outline-variant/40 bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleAccordion("why")}
              className="w-full flex items-center justify-between p-4 text-left font-bold text-xs text-brand-primary cursor-pointer hover:bg-brand-surface/50 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Lock className="w-4 h-4 text-brand-secondary" />
                <span>Why we collect it</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-brand-muted transition-transform ${activeTab === "why" ? 'rotate-180 text-brand-primary' : ''}`} />
            </button>
            
            {activeTab === "why" && (
              <div className="p-4 pt-1 border-t border-brand-surface-container font-medium text-[11px] text-brand-muted leading-relaxed space-y-2">
                <p>Metrics help deliver user authorization states and display direct connection social feeds. We never analyze patterns to serve ads or compile marketing brochures.</p>
              </div>
            )}
          </div>

          {/* Item 3: your rights */}
          <div className="rounded-xl border border-brand-outline-variant/40 bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleAccordion("rights")}
              className="w-full flex items-center justify-between p-4 text-left font-bold text-xs text-brand-primary cursor-pointer hover:bg-brand-surface/50 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <ScaleIcon className="w-4 h-4 text-brand-secondary" />
                <span>Your rights</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-brand-muted transition-transform ${activeTab === "rights" ? 'rotate-180 text-brand-primary' : ''}`} />
            </button>
            
            {activeTab === "rights" && (
              <div className="p-4 pt-1 border-t border-brand-surface-container font-medium text-[11px] text-brand-muted leading-relaxed space-y-2">
                <p>You have full ownership of your data under decentralization mandates. You may extract your ledger history, revoke analytics permissions instantly, and schedule account sweeps at any point without explanation.</p>
              </div>
            )}
          </div>

          {/* Item 4: how AI is used */}
          <div className="rounded-xl border border-brand-outline-variant/40 bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleAccordion("ai")}
              className="w-full flex items-center justify-between p-4 text-left font-bold text-xs text-brand-primary cursor-pointer hover:bg-brand-surface/50 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-4 h-4 text-brand-secondary animate-pulse" />
                <span>How AI is used</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-brand-muted transition-transform ${activeTab === "ai" ? 'rotate-180 text-brand-primary' : ''}`} />
            </button>
            
            {activeTab === "ai" && (
              <div className="p-4 pt-1 border-t border-brand-surface-container font-medium text-[11px] text-brand-muted leading-relaxed space-y-2">
                <p>AI scanners check drafts entirely locally. Scanning does not transmit your personal conversations or texts to corporate servers or third-party training data buckets.</p>
              </div>
            )}
          </div>

        </div>

        {/* Artistic SVG wave banner matched to image files */}
        <div className="rounded-2xl border border-brand-outline-variant/40 bg-white overflow-hidden shadow-sm p-3">
          <div className="relative h-44 rounded-xl bg-gradient-to-br from-[#123C3A] via-[#2a6956] to-[#a8e6cf] overflow-hidden flex flex-col justify-end p-4">
            {/* Organic green layers */}
            <svg viewBox="0 0 400 200" className="absolute top-0 left-0 w-full h-full opacity-65" preserveAspectRatio="none">
              <path d="M0,80 C120,40 240,160 400,90 L400,200 L0,200 Z" fill="#2c6956" />
              <path d="M0,130 C150,170 250,90 400,140 L400,200 L0,200 Z" fill="#aeedd5" />
            </svg>
            <div className="relative flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-white tracking-widest uppercase bg-black/30 backdrop-blur-md px-2 py-1 rounded">
                Last updated: Oct 24, 2026
              </span>
              <Shield className="w-6 h-6 text-brand-mint" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Contact help line prompt */}
        <div className="pt-4 text-center space-y-3">
          <p className="text-xs text-brand-muted font-medium">Still have questions?</p>
          
          <button 
            onClick={() => alert("Connecting to Privacy Team: secure channel opened. Write custom requests to care@privacyhub.io")}
            className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-brand-primary text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-primary/95 transition-all cursor-pointer shadow-md"
          >
            <Mail className="w-4 h-4 text-brand-mint" />
            <span>Contact Privacy Team</span>
          </button>
        </div>

      </div>
    </div>
  );
}

// Small helper scale icon in v4 tailwind
function ScaleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="m16 16 3-8 3 8c-.87.65-2.24 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-2.24 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 2v19" />
      <path d="M5 8h14" />
    </svg>
  );
}
