/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ShieldAlert, RefreshCw, Copy, Check, FileDown, ShieldCheck, Heart, Sparkles, ToggleLeft, FileText, Share2, Clipboard, ArrowLeft } from "lucide-react";
import { TrustEvent, ScreenID } from "../types";

interface TrustLogProps {
  events: TrustEvent[];
  onNavigate: (screen: ScreenID) => void;
  onClearLog?: () => void;
}

export default function TrustLog({ events, onNavigate, onClearLog }: TrustLogProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [synced, setSynced] = useState(true);

  const handleCopyHash = (evId: string, hash: string) => {
    navigator.clipboard.writeText(hash).catch(() => {});
    setCopiedId(evId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSyncReset = () => {
    setSynced(false);
    setTimeout(() => setSynced(true), 1200);
  };

  return (
    <div 
      className="flex flex-col h-full bg-brand-surface overflow-y-auto"
      id="trust-log-screen"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-brand-outline-variant/30 sticky top-0 bg-brand-surface/90 backdrop-blur-md z-15">
        <span className="font-extrabold text-brand-primary tracking-tight font-sans text-base">
          PrivacyHub
        </span>
        <button 
          onClick={handleSyncReset}
          className="p-1.5 rounded-full hover:bg-brand-surface-container transition-transform cursor-pointer text-brand-primary active:rotate-180 duration-500"
          title="Force block sync check"
        >
          <RefreshCw className={`w-5 h-5 ${!synced ? 'animate-spin text-brand-secondary' : ''}`} />
        </button>
      </div>

      <div className="px-6 py-6 space-y-6">
        
        {/* Editorial Title */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-brand-primary font-sans leading-none">
            Trust Log
          </h2>
          <p className="text-sm text-brand-muted font-medium">
            A tamper-resistant history of your consent actions.
          </p>
        </div>

        {/* Top Two Stat Cards Row */}
        <div className="grid grid-cols-2 gap-3 pb-2">
          
          {/* Card 1: Status */}
          <div className="p-4 rounded-xl border border-brand-outline-variant/40 bg-white shadow-xs space-y-1">
            <div className="flex items-center space-x-1.5 text-brand-secondary">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Status</span>
            </div>
            <p className="text-sm font-extrabold text-brand-primary">Live & Secure</p>
          </div>

          {/* Card 2: Hash Sync */}
          <div className="p-4 rounded-xl border border-brand-outline-variant/40 bg-white shadow-xs space-y-1">
            <div className="flex items-center space-x-1.5 text-brand-secondary">
              <RefreshCw className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Hash Sync</span>
            </div>
            <p className="text-sm font-extrabold text-brand-primary">
              {synced ? "100% Valid" : "Checking block..."}
            </p>
          </div>

        </div>

        {/* Ledger events list inside vertical timeline */}
        <div className="relative pl-2 space-y-6 timeline-dashed">
          
          {events.map((ev) => {
            // Pick logical icon based on event category
            const isCopied = copiedId === ev.id;
            
            return (
              <div key={ev.id} className="relative pl-8 animate-fadeIn">
                
                {/* Visual bullet circle */}
                <span className="absolute left-0 top-1.5 w-8 h-8 rounded-full border border-brand-outline-variant/60 bg-brand-bg flex items-center justify-center text-brand-primary z-10 shadow-xs">
                  {ev.category === "ai_safety" && <Sparkles className="w-4 h-4 text-brand-secondary" />}
                  {ev.category === "consent" && <ToggleLeft className="w-4 h-4 text-brand-secondary" />}
                  {ev.category === "legal" && <FileText className="w-4 h-4 text-brand-secondary" />}
                  {ev.category === "post" && <ShieldCheck className="w-4 h-4 text-brand-secondary" />}
                  {ev.category === "auth" && <ShieldCheck className="w-4 h-4 text-brand-secondary" />}
                </span>

                {/* Event Card detail */}
                <div className="p-4 rounded-2xl border border-brand-outline-variant/40 bg-white shadow-xs space-y-3">
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-brand-primary pr-2">
                        {ev.title}
                      </h4>
                      <p className="text-[10px] font-mono font-medium tracking-wide text-brand-muted/70 mt-1">
                        {ev.timestamp} UTC
                      </p>
                    </div>

                    <span className="flex-shrink-0 text-[10px] font-extrabold px-2 py-0.5 rounded-sm bg-brand-mint/40 text-brand-primary font-sans">
                      {ev.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-brand-muted font-medium leading-relaxed">
                    {ev.description}
                  </p>

                  {/* Blockchain Hash component */}
                  <div className="pt-2 border-t border-brand-outline-variant/20 flex flex-col space-y-1">
                    <span className="text-[9px] font-bold text-brand-muted/80 tracking-widest uppercase">
                      Blockchain Hash
                    </span>
                    <div className="flex items-center space-x-2">
                      <code className="text-[10px] font-mono font-bold text-brand-primary bg-brand-surface border border-brand-outline-variant/30 rounded px-2 py-1 flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                        {ev.blockchainHash}
                      </code>
                      <button
                        onClick={() => handleCopyHash(ev.id, ev.blockchainHash)}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${isCopied ? 'bg-brand-mint/40 border-brand-mint text-brand-primary' : 'bg-white border-brand-outline-variant/60 hover:border-brand-primary hover:bg-brand-surface text-brand-muted'}`}
                        title={isCopied ? "Hash copied!" : "Copy full cryptographic hash"}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* Dynamic Download report Certificate Callout block */}
        <div className="rounded-2xl bg-brand-primary p-5 text-white space-y-4 shadow-lg shadow-brand-primary/10">
          <div className="space-y-1.5 text-center">
            <h4 className="text-sm font-extrabold text-brand-mint uppercase tracking-wider">
              Download Trust Certificate
            </h4>
            <p className="text-xs text-[#aeedd5] font-medium leading-relaxed">
              Generate a cryptographically signed PDF of your entire consent history for legal or personal audits.
            </p>
          </div>
          
          <button 
            onClick={() => setShowCertificate(true)}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-6 rounded-lg bg-brand-mint text-brand-primary hover:bg-white transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>

      </div>

      {/* Trust Certificate Modal Drawer overlay */}
      {showCertificate && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-6 bg-black/65 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border-2 border-brand-primary p-6 w-full max-w-[340px] space-y-6 shadow-2xl relative">
            <div className="text-center space-y-1">
              <ShieldCheck className="w-10 h-10 text-brand-secondary mx-auto animate-pulse" />
              <h3 className="text-sm font-extrabold text-brand-primary tracking-tight">
                PrivacyHub Cryptographic Manifest
              </h3>
              <p className="text-[10px] text-brand-muted font-bold font-mono">
                SECURE PUBLIC LEDGER STATE
              </p>
            </div>

            {/* Manifest table specs */}
            <div className="space-y-2 border-y border-brand-outline-variant/30 py-3 text-[11px] font-bold text-brand-muted space-y-1.5">
              <div className="flex justify-between">
                <span>Total Actions Recorded</span>
                <span className="text-brand-primary">{events.length} logs</span>
              </div>
              <div className="flex justify-between">
                <span>Verification State</span>
                <span className="text-brand-secondary">100% Cryptographic Match</span>
              </div>
              <div className="flex justify-between">
                <span>Auditor Root Hash</span>
                <span className="text-brand-primary font-mono text-[9px]">4A5E8..DF821</span>
              </div>
              <div className="flex justify-between">
                <span>Generation Time</span>
                <span className="text-brand-primary">23 May 2026 UTC</span>
              </div>
            </div>

            <p className="text-[10px] text-brand-muted text-center font-medium font-sans italic">
              This certificate constitutes an immutable offline backup. All items have been generated completely client-side in an sandboxed environment.
            </p>

            <div className="flex space-y-2 flex-col">
              <button
                onClick={() => {
                  alert("Certificate report printed to console and downloaded to storage layout logs securely!");
                  setShowCertificate(false);
                }}
                className="w-full py-2 bg-brand-primary text-white font-bold text-xs uppercase rounded-lg hover:bg-brand-primary/90 transition-colors cursor-pointer"
              >
                Download PDF
              </button>
              
              <button
                onClick={() => setShowCertificate(false)}
                className="w-full py-2 text-center text-xs font-bold text-brand-muted hover:text-brand-primary cursor-pointer border border-brand-outline-variant rounded-lg"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
