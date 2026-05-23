/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ArrowLeft, UserCog, Eye, Sparkles, BrainCircuit, ShieldAlert, Database, FileDown, Trash2, Heart, HelpCircle, FileText, Scale, ShieldCheck } from "lucide-react";
import { ScreenID } from "../types";

interface PrivacySettingsProps {
  onGoBack: () => void;
  onNavigate: (screen: ScreenID) => void;
  
  // Real State Handlers bound to App level state
  profileVisibility: boolean;
  setProfileVisibility: (v: boolean) => void;
  
  activityStatus: boolean;
  setActivityStatus: (v: boolean) => void;
  
  aiSafetyScanConsent: boolean;
  setAiSafetyScanConsent: (v: boolean) => void;
  
  explainAiWarnings: boolean;
  setExplainAiWarnings: (v: boolean) => void;
  
  analyticsConsent: boolean;
  setAnalyticsConsent: (v: boolean) => void;

  onTriggerLog: (actionName: string, desc: string, category: "ai_safety" | "consent" | "legal") => void;
}

export default function PrivacySettings({
  onGoBack,
  onNavigate,
  profileVisibility,
  setProfileVisibility,
  activityStatus,
  setActivityStatus,
  aiSafetyScanConsent,
  setAiSafetyScanConsent,
  explainAiWarnings,
  setExplainAiWarnings,
  analyticsConsent,
  setAnalyticsConsent,
  onTriggerLog
}: PrivacySettingsProps) {
  
  const handleToggle = (
    key: "visibility" | "activity" | "ai_scan" | "ai_explain" | "analytics",
    currentVal: boolean,
    setter: (v: boolean) => void,
    title: string,
    category: "ai_safety" | "consent" | "legal"
  ) => {
    const newVal = !currentVal;
    setter(newVal);
    onTriggerLog(
      `${title} turned ${newVal ? 'on' : 'off'}`,
      `User updated preferences in Privacy settings center.`,
      category
    );
  };

  const handleDownloadData = () => {
    onTriggerLog("Data archive requested", "Compiled client archive package containing local profiles and feed state.", "consent");
    alert("Compiling Archive: Your profile, posts, logs, and cryptographic keys are ready for secure offline download. Status: Complete.");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your PrivacyHub account? This action will overwrite and invalidate all cryptographic proof histories. This cannot be undone.");
    if (confirmDelete) {
      onTriggerLog("Account flagged for deletion", "Initiated 30-day grace period for physical ledger purge.", "legal");
      alert("Account scheduled for deletion. You will be signed out.");
      onNavigate("onboarding");
    }
  };

  return (
    <div 
      className="flex flex-col h-full bg-brand-surface overflow-y-auto"
      id="privacy-settings-screen"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-brand-outline-variant/30 sticky top-0 bg-brand-surface/90 backdrop-blur-md z-10 animate-slideDown">
        <button 
          onClick={onGoBack}
          className="p-1 rounded-lg hover:bg-brand-surface-container transition-colors cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-brand-primary" />
        </button>
        <span className="font-extrabold text-brand-primary tracking-tight text-xs uppercase">
          Privacy Hub Settings
        </span>
        <div className="w-7 shadow-xs" />
      </div>

      <div className="px-6 py-6 space-y-6 pb-20">
        
        {/* Title details */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-brand-primary font-sans leading-none">
            Privacy & Consent
          </h2>
          <p className="text-xs text-brand-muted font-medium">
            Control what you share and how your data is used.
          </p>
        </div>

        {/* Group 1: Profile Privacy */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-brand-primary text-xs font-extrabold uppercase tracking-wider">
            <UserCog className="w-4.5 h-4.5 text-brand-secondary" />
            <span>Profile Privacy</span>
          </div>

          <div className="rounded-2xl border border-brand-outline-variant/40 bg-white p-4.5 space-y-4 shadow-xs">
            
            {/* Toggle 1: Profile visibility */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 pr-4">
                <h4 className="text-xs font-bold text-brand-primary">Profile visibility</h4>
                <p className="text-[10px] text-brand-muted font-medium leading-normal">
                  Allow others to find your profile via email or name.
                </p>
              </div>
              <button 
                type="button"
                onClick={() => handleToggle("visibility", profileVisibility, setProfileVisibility, "Profile visibility", "consent")}
                className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 cursor-pointer ${profileVisibility ? 'bg-brand-secondary' : 'bg-brand-outline-variant/60'}`}
              >
                <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-transform ${profileVisibility ? 'right-0.75' : 'left-0.75'}`} />
              </button>
            </div>

            {/* Toggle 2: Activity status */}
            <div className="flex items-center justify-between pt-3.5 border-t border-brand-surface-container">
              <div className="space-y-0.5 pr-4">
                <h4 className="text-xs font-bold text-brand-primary">Activity status</h4>
                <p className="text-[10px] text-brand-muted font-medium leading-normal">
                  Show when you are active on the platform.
                </p>
              </div>
              <button 
                type="button"
                onClick={() => handleToggle("activity", activityStatus, setActivityStatus, "Activity status", "consent")}
                className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 cursor-pointer ${activityStatus ? 'bg-brand-secondary' : 'bg-brand-outline-variant/60'}`}
              >
                <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-transform ${activityStatus ? 'right-0.75' : 'left-0.75'}`} />
              </button>
            </div>

          </div>
        </div>

        {/* Group 2: AI Safety */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-brand-primary text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4.5 h-4.5 text-brand-secondary" />
            <span>AI Safety Measures</span>
          </div>

          <div className="rounded-2xl border border-brand-outline-variant/40 bg-white p-4.5 space-y-4 shadow-xs">
            
            {/* Toggle 3: AI safety scan consent */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 pr-4">
                <h4 className="text-xs font-bold text-brand-primary">AI safety scan consent</h4>
                <p className="text-[10px] text-brand-muted font-medium leading-normal">
                  Allow our AI to scan your activity for safety violations.
                </p>
              </div>
              <button 
                type="button"
                onClick={() => handleToggle("ai_scan", aiSafetyScanConsent, setAiSafetyScanConsent, "AI safety scan consent", "ai_safety")}
                className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 cursor-pointer ${aiSafetyScanConsent ? 'bg-brand-secondary' : 'bg-brand-outline-variant/60'}`}
              >
                <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-transform ${aiSafetyScanConsent ? 'right-0.75' : 'left-0.75'}`} />
              </button>
            </div>

            {/* Toggle 4: Explain AI warnings */}
            <div className="flex items-center justify-between pt-3.5 border-t border-brand-surface-container">
              <div className="space-y-0.5 pr-4">
                <h4 className="text-xs font-bold text-brand-primary">Explain AI warnings</h4>
                <p className="text-[10px] text-brand-muted font-medium leading-normal">
                  Receive detailed breakdowns of AI-generated alerts.
                </p>
              </div>
              <button 
                type="button"
                onClick={() => handleToggle("ai_explain", explainAiWarnings, setExplainAiWarnings, "Detailed AI alerts", "ai_safety")}
                className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 cursor-pointer ${explainAiWarnings ? 'bg-brand-secondary' : 'bg-brand-outline-variant/60'}`}
              >
                <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-transform ${explainAiWarnings ? 'right-0.75' : 'left-0.75'}`} />
              </button>
            </div>

          </div>
        </div>

        {/* Group 3: Data Control */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-brand-primary text-xs font-extrabold uppercase tracking-wider">
            <Database className="w-4.5 h-4.5 text-brand-secondary" />
            <span>Data Control</span>
          </div>

          <div className="rounded-2xl border border-brand-outline-variant/40 bg-white p-4.5 space-y-4.5 shadow-xs">
            
            {/* Toggle 5: Analytics consent */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 pr-4">
                <h4 className="text-xs font-bold text-brand-primary">Analytics consent</h4>
                <p className="text-[10px] text-brand-muted font-medium leading-normal">
                  Help us improve by sharing anonymized usage metrics.
                </p>
              </div>
              <button 
                type="button"
                onClick={() => handleToggle("analytics", analyticsConsent, setAnalyticsConsent, "Analytics consent", "consent")}
                className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 cursor-pointer ${analyticsConsent ? 'bg-brand-secondary' : 'bg-brand-outline-variant/60'}`}
              >
                <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-transform ${analyticsConsent ? 'right-0.75' : 'left-0.75'}`} />
              </button>
            </div>

            {/* Click 1: Download my data */}
            <button 
              onClick={handleDownloadData}
              className="w-full flex items-center justify-between pt-3.5 border-t border-brand-surface-container text-left cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center text-brand-primary">
                  <FileDown className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-brand-primary group-hover:underline">Download my data</span>
              </div>
              <span className="text-xs text-brand-muted font-bold font-mono">→</span>
            </button>

            {/* Click 2: Delete my account */}
            <button 
              onClick={handleDeleteAccount}
              className="w-full flex items-center justify-between pt-3.5 border-t border-brand-surface-container text-left cursor-pointer group text-red-600"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                  <Trash2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold group-hover:underline">Delete my account</span>
              </div>
              <span className="text-xs text-brand-muted font-bold font-mono">→</span>
            </button>

          </div>
        </div>

        {/* Group 4: Legal */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-brand-primary text-xs font-extrabold uppercase tracking-wider">
            <FileText className="w-4.5 h-4.5 text-brand-secondary" />
            <span>Legal agreements</span>
          </div>

          <div className="rounded-2xl border border-brand-outline-variant/40 bg-white p-4.5 space-y-3 shadow-xs font-sans">
            
            <button 
              onClick={() => onNavigate("privacy_policy")}
              className="w-full flex items-center justify-between text-left cursor-pointer group py-1"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-4.5 h-4.5 text-brand-muted" />
                <span className="text-xs font-bold text-brand-primary group-hover:underline">Privacy Policy</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-brand-muted">EXPAND</span>
            </button>

            <button 
              onClick={() => onNavigate("terms_conditions")}
              className="w-full flex items-center justify-between pt-3 border-t border-brand-surface-container text-left cursor-pointer group py-1"
            >
              <div className="flex items-center space-x-3">
                <Scale className="w-4.5 h-4.5 text-brand-muted" />
                <span className="text-xs font-bold text-brand-primary group-hover:underline">Terms & Conditions</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-brand-muted">EXPAND</span>
            </button>

          </div>
        </div>

        {/* Microchip priority branding banner (from screenshot) */}
        <div className="rounded-2xl border border-brand-primary/20 bg-brand-surface-container overflow-hidden p-[1px]">
          <div className="bg-gradient-to-tr from-[#123C3A] to-[#254d4b] text-white p-5 rounded-2xl relative overflow-hidden">
            
            {/* Grid structure simulation */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
            
            <div className="relative space-y-3 text-center">
              <ShieldCheck className="w-10 h-10 text-brand-mint mx-auto" strokeWidth={1.5} />
              
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-brand-mint uppercase tracking-widest font-sans">
                  Your Privacy is Our Priority
                </h4>
                <p className="text-[10px] text-[#aeedd5] leading-relaxed font-semibold">
                  Every setting change is cryptographically logged and sync Checked on-ledger for your complete transparency.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
