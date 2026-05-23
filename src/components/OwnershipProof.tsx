/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ArrowLeft, CheckCircle, Copy, Check, Info, ShieldCheck, Clipboard, ExternalLink, Calendar, User, FileText, Download } from "lucide-react";
import { Post, ScreenID } from "../types";

interface OwnershipProofProps {
  onGoBack: () => void;
  post?: Post;
  currentUsername: string;
}

export default function OwnershipProof({ onGoBack, post, currentUsername }: OwnershipProofProps) {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const hashString = post?.assetHash || "9A72F1B84CED62D917AFAFEED3CA1E2C";

  const handleCopyHash = () => {
    navigator.clipboard.writeText(hashString).catch(() => {});
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://privacyhub.io/proof/${hashString.slice(0, 8)}`).catch(() => {});
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div 
      className="flex flex-col h-full bg-brand-surface overflow-y-auto"
      id="ownership-proof-screen"
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
        <span className="font-extrabold text-brand-primary tracking-tight text-xs uppercase font-mono">
          Cryptographic Evidence
        </span>
        <div className="w-7 shadow-xs" />
      </div>

      <div className="px-6 py-6 space-y-6 pb-20">
        
        {/* Verification Pill and Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-brand-primary font-sans leading-none">
            Ownership Proof
          </h2>

          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-brand-mint text-brand-primary text-[10px] font-bold tracking-wider uppercase">
            <CheckCircle className="w-3 h-3 text-brand-primary" />
            <span>Verified</span>
          </span>
        </div>

        <p className="text-xs text-brand-muted font-medium leading-relaxed">
          Digital certificate of content origin and creation timestamp.
        </p>

        {/* Certificate Card container matching wireframe */}
        <div className="rounded-2xl border border-brand-outline-variant/50 bg-white p-5 space-y-6 shadow-sm relative overflow-hidden">
          
          {/* Subtle watermark seal stamp in CSS/SVG */}
          <div className="absolute right-[-20px] top-[-20px] w-36 h-36 border-4 border-brand-mint/20 rounded-full flex items-center justify-center font-mono font-bold text-brand-mint/10 tracking-widest text-[12px] rotate-12 select-none pointer-events-none">
            VERIFIED JOURNAL SHIELD BLOCK 492
          </div>

          <div className="grid grid-cols-2 gap-4 border-b border-brand-surface-container pb-4">
            <div>
              <span className="block text-[9px] font-extrabold tracking-widest text-brand-muted/70 uppercase">Asset Owner</span>
              <span className="text-xs font-black text-brand-primary font-sans">@{currentUsername}</span>
            </div>
            <div>
              <span className="block text-[9px] font-extrabold tracking-widest text-brand-muted/70 uppercase">Creation Date</span>
              <span className="text-xs font-black text-brand-primary font-sans">23 May 2026</span>
            </div>
          </div>

          {/* Copyable hash component layout */}
          <div className="space-y-2">
            <span className="block text-[9px] font-extrabold tracking-widest text-brand-muted/70 uppercase">Content Fingerprint (Post Hash)</span>
            
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-brand-primary bg-brand-surface border border-brand-outline-variant/30 px-3 py-2 rounded-lg flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                {hashString.slice(0, 10)}...
              </span>

              <button
                onClick={handleCopyHash}
                className="flex items-center space-x-1 px-4 py-2 bg-brand-primary text-white hover:bg-brand-primary/95 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
              >
                {copiedHash ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHash ? "Copied" : "Copy Hash"}</span>
              </button>
            </div>
          </div>

          {/* Verification status blocks */}
          <div className="flex items-start space-x-3 bg-brand-surface-container/40 border border-brand-surface-container p-3 rounded-xl">
            <ShieldCheck className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-brand-primary leading-none">Ownership Status: Verified</h4>
              <p className="text-[10px] text-brand-muted font-medium">Immutable record verified via Trust Log blockchain sync.</p>
            </div>
          </div>

          {/* Center mock physical receipt voucher */}
          <div className="border border-brand-outline-variant/40 rounded-xl bg-brand-surface p-4 flex flex-col items-center space-y-3">
            <div className="w-20 h-20 bg-white border border-brand-outline-variant/40 rounded px-1.5 py-1.5 flex flex-col items-center justify-center">
              {/* Artistic QR-like grid simulation */}
              <div className="grid grid-cols-5 gap-1 w-full h-full opacity-70">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`rounded-2xs ${ (i * 7 + 13) % 4 === 0 || (i % 3 === 0 && i > 5)  ? 'bg-brand-primary' : 'bg-transparent' }`} 
                  />
                ))}
              </div>
            </div>
            <span className="text-[9px] font-mono font-bold text-brand-muted tracking-wider">PROOF STATE ROOT #0x4E9A</span>
          </div>

        </div>

        {/* How it works info list (Accordion items in image) */}
        <div className="rounded-2xl border border-brand-outline-variant/40 bg-white p-5 space-y-4 shadow-2xs font-sans">
          
          {/* Section 1 */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-brand-primary">
              <Info className="w-4 h-4 text-brand-primary" />
              <h4 className="text-xs font-bold uppercase tracking-wider">How it works</h4>
            </div>
            <p className="text-xs text-brand-muted font-normal leading-relaxed pl-6">
              This proof helps show that your content was created by you at this time. The original post is not stored on-chain, only a cryptographically signed hash digest.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-1 pt-3 border-t border-brand-surface-container">
            <div className="flex items-center space-x-2 text-brand-primary">
              <ShieldCheck className="w-4 h-4 text-brand-secondary" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Zero-Knowledge</h4>
            </div>
            <p className="text-xs text-brand-muted font-normal leading-relaxed pl-6">
              Your actual content and raw text remain private, offline, and off-chain. Only audit proofs are recorded.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-1 pt-3 border-t border-brand-surface-container">
            <div className="flex items-center space-x-2 text-brand-primary">
              <Calendar className="w-4 h-4 text-brand-primary" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Immutable Proof</h4>
            </div>
            <p className="text-xs text-brand-muted font-normal leading-relaxed pl-6">
              This digital timestamp is finalized into a block epoch and cannot be altered, spoofed, or backdated.
            </p>
          </div>

        </div>

        {/* Proof Timeline block */}
        <div className="rounded-2xl border border-brand-outline-variant/40 bg-white p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-brand-primary uppercase tracking-wider">Proof Timeline</h4>
            <span className="text-[9px] font-mono font-bold tracking-wider text-brand-muted/75 uppercase uppercase">REAL-TIME</span>
          </div>

          {/* Simple step timeline list */}
          <div className="relative pl-4 space-y-4 border-l border-brand-outline-variant/40">
            
            {/* Step 1 */}
            <div className="relative">
              <span className="absolute -left-5.5 top-1 w-3 h-3 bg-brand-secondary border-2 border-white rounded-full" />
              <div className="space-y-0.5">
                <h5 className="text-[11px] font-bold text-brand-primary">Verified by Ledger</h5>
                <p className="text-[10px] text-brand-muted">Today, 10:24 AM</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <span className="absolute -left-5.5 top-1 w-3 h-3 bg-brand-outline-variant rounded-full" />
              <div className="space-y-0.5">
                <h5 className="text-[11px] font-semibold text-brand-primary">Hash Generated</h5>
                <p className="text-[10px] text-brand-muted">Today, 10:23 AM</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <span className="absolute -left-5.5 top-1 w-3 h-3 bg-brand-outline-variant rounded-full" />
              <div className="space-y-0.5">
                <h5 className="text-[11px] font-semibold text-brand-primary">Content Authored</h5>
                <p className="text-[10px] text-brand-muted">May 23, 2026, 09:12 AM</p>
              </div>
            </div>

          </div>
        </div>

        {/* Action item buttons */}
        <div className="space-y-2 pt-2">
          
          <button
            onClick={() => alert("Trust Certificate PDF exported successfully!")}
            className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-white border border-brand-outline-variant hover:border-brand-primary text-brand-primary font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Certificate</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full py-2.5 text-center text-xs font-bold text-brand-secondary hover:underline cursor-pointer block"
          >
            {copiedLink ? "✓ Public Link Copied!" : "🔗 Share Public Link"}
          </button>

        </div>

      </div>
    </div>
  );
}
