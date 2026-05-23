/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ArrowLeft, Handshake, ShieldAlert, BadgeCheck, Bot, Check, Shield } from "lucide-react";
import { ScreenID } from "../types";

interface TermsConditionsProps {
  onGoBack: () => void;
  onAccept?: () => void;
}

export default function TermsConditions({ onGoBack, onAccept }: TermsConditionsProps) {
  const [agreed, setAgreed] = useState(false);

  const handleAcceptClick = () => {
    if (!agreed) return;
    if (onAccept) {
      onAccept();
    } else {
      alert("Terms & Conditions accepted. Logged to the cryptographic ledger state.");
      onGoBack();
    }
  };

  return (
    <div 
      className="flex flex-col h-full bg-brand-surface overflow-y-auto"
      id="terms-conditions-screen"
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
        <span className="font-extrabold text-brand-primary tracking-tight text-xs uppercase">
          LEGAL CONCORDANCE
        </span>
        <div className="w-7 shadow-xs" />
      </div>

      <div className="px-6 py-6 space-y-6 pb-20">
        
        {/* Title area */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-brand-primary font-sans">
            Terms & Conditions
          </h2>
          <p className="text-xs text-brand-muted font-medium leading-relaxed">
            Rules that keep the community safe and respectful. These terms govern your interaction with PrivacyHub and our commitment to ethical data practices.
          </p>
        </div>

        {/* Premium Laptop display card from mockup */}
        <div className="rounded-2xl border border-brand-outline-variant/40 bg-white p-3 overflow-hidden shadow-xs">
          <div className="relative rounded-xl overflow-hidden h-36 bg-gray-50 border border-brand-outline-variant/25">
            <img 
              src="https://images.unsplash.com/photo-1496181130204-755241544e3f?w=600&auto=format&fit=crop&q=80" 
              alt="Workspace Laptop" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85"
            />
          </div>
        </div>

        {/* Feature terms columns */}
        <div className="space-y-4">
          
          {/* Term 1: Respectful use */}
          <div className="p-5 rounded-2xl border border-brand-outline-variant/40 bg-white shadow-2xs space-y-2">
            <div className="flex items-center space-x-3 text-brand-primary">
              <div className="p-2.5 rounded-xl bg-brand-mint/45 text-brand-primary">
                <Handshake className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-wider">Respectful use</h4>
            </div>
            <p className="text-[11px] text-brand-muted font-medium leading-relaxed pl-1">
              PrivacyHub is built for mindful connections. Users are expected to interact with kindness, respecting the digital boundaries and personal data of others at all times.
            </p>
          </div>

          {/* Term 2: No hate speech */}
          <div className="p-5 rounded-2xl border border-brand-outline-variant/40 bg-white shadow-2xs space-y-2">
            <div className="flex items-center space-x-3 text-brand-primary col">
              <div className="p-2.5 rounded-xl bg-red-50 text-red-500">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-wider">No hate speech</h4>
            </div>
            <p className="text-[11px] text-brand-muted font-medium leading-relaxed pl-1">
              Zero tolerance for harassment, discrimination, or harmful rhetoric. We prioritize a safe space for all members regardless of background or identity.
            </p>
          </div>

          {/* Term 3: Content ownership */}
          <div className="p-5 rounded-2xl border border-brand-outline-variant/40 bg-white shadow-2xs space-y-2">
            <div className="flex items-center space-x-3 text-brand-secondary">
              <div className="p-2.5 rounded-xl bg-brand-mint/45 text-brand-primary">
                <BadgeCheck className="w-4 h-4 text-brand-primary" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-wider">Content ownership</h4>
            </div>
            <p className="text-[11px] text-brand-muted font-medium leading-relaxed pl-1">
              You own your data and your content. We provide the hub, but the sovereignty over your digital footprint remains exclusively in your hands.
            </p>
          </div>

          {/* Term 4: AI support */}
          <div className="p-5 rounded-2xl border border-brand-outline-variant/40 bg-white shadow-2xs space-y-2">
            <div className="flex items-center space-x-3 text-brand-primary">
              <div className="p-2.5 rounded-xl bg-brand-surface-container text-brand-primary">
                <Bot className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-wider">AI support</h4>
            </div>
            <p className="text-[11px] text-brand-muted font-medium leading-relaxed pl-1">
              Our AI models are trained locally and ethically. They assist in moderation and support without harvesting your private interactions for external corporate gain.
            </p>
          </div>

        </div>

        {/* Detailed Information Box */}
        <div className="p-5 rounded-2xl bg-brand-surface-container/70 border border-brand-outline-variant/30 space-y-4">
          <div className="space-y-1">
            <span className="block text-[9px] font-extrabold tracking-widest text-brand-muted uppercase">Detailed Information</span>
            <span className="block text-[10px] font-bold text-brand-muted/75">Last updated: October 24, 2026</span>
          </div>

          <p className="text-xs text-brand-muted font-medium leading-relaxed">
            By accessing or using PrivacyHub, you agree to be bound by these terms. We believe in transparency over fine print. Our mission is to facilitate a decentralized and private digital ecosystem where the user is the primary stakeholder.
          </p>

          <div className="space-y-2 pt-2 border-t border-brand-outline-variant/20">
            <div className="flex items-center space-x-2.5">
              <Check className="w-4 h-4 text-brand-secondary" />
              <span className="text-[11px] font-bold text-brand-primary">Automated encryption for all outgoing communications.</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Check className="w-4 h-4 text-brand-secondary" />
              <span className="text-[11px] font-bold text-brand-primary">Mandatory two-factor authentication for account security.</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Check className="w-4 h-4 text-brand-secondary" />
              <span className="text-[11px] font-bold text-brand-primary">Opt-in only data sharing policies for all beta features.</span>
            </div>
          </div>
        </div>

        {/* Acceptance Interaction section */}
        <div className="space-y-4 pt-2 border-t border-brand-outline-variant/20">
          
          <label className="flex items-start space-x-3 cursor-pointer select-none">
            <input 
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4.5 h-4.5 rounded-md border-brand-outline-variant text-brand-primary focus:ring-brand-primary accent-brand-secondary cursor-pointer"
            />
            <span className="text-xs text-brand-muted font-bold">
              I have read and agree to the Terms & Conditions
            </span>
          </label>

          {/* Action buttons matching screenshot */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onGoBack}
              className="py-3 text-center border border-brand-outline-variant rounded-xl text-brand-primary hover:border-brand-primary text-xs font-bold uppercase transition-colors cursor-pointer bg-white"
            >
              Decline
            </button>

            <button
              onClick={handleAcceptClick}
              disabled={!agreed}
              className={`py-3 text-center rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${agreed ? 'bg-brand-primary-container text-brand-mint hover:bg-brand-primary hover:text-white shadow-md' : 'bg-brand-surface-container text-brand-muted/50 cursor-not-allowed border border-brand-outline-variant/30'}`}
            >
              Accept
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
