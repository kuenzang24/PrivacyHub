/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Shield, Sparkles, Image, Globe, Users, Lock, HelpCircle, Send, Lightbulb, ImagePlay } from "lucide-react";
import { ScreenID } from "../types";

interface CreatePostProps {
  onCancel: () => void;
  onSubmitPost: (data: {
    content: string;
    imageUrl?: string;
    visibility: "Public" | "Friends only" | "Private";
    aiSafetyScan: boolean;
  }) => void;
}

// Preset visual artwork URLs for users to toggle in the mockup
const MINIMALIST_ARTWORK_PRESETS = [
  {
    name: "Minimalist Glass",
    url: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Abstract Circuit",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Glowing Optics",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Physical Vault",
    url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80"
  }
];

export default function CreatePost({ onCancel, onSubmitPost }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [selectedArtUrl, setSelectedArtUrl] = useState<string | undefined>(undefined);
  const [showPresets, setShowPresets] = useState(false);
  const [visibility, setVisibility] = useState<"Public" | "Friends only" | "Private">("Friends only");
  const [showVisibilityMenu, setShowVisibilityMenu] = useState(false);
  const [aiSafetyScan, setAiSafetyScan] = useState(true);

  // Quick helper to insert placeholder sensitive values for testing AI warning modal
  const insertTestPhoneNumber = () => {
    setContent((prev) => prev + " Contact me directly at +1-206-555-0199 to discuss.");
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !selectedArtUrl) {
      alert("Please entering some text or choose an visual artwork.");
      return;
    }

    onSubmitPost({
      content,
      imageUrl: selectedArtUrl,
      visibility,
      aiSafetyScan
    });
  };

  return (
    <div 
      className="flex flex-col h-full bg-brand-surface overflow-y-auto"
      id="create-post-screen"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-brand-outline-variant/30 sticky top-0 bg-brand-surface/90 backdrop-blur-md z-10">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-brand-primary" strokeWidth={2.5} />
          <span className="font-extrabold text-brand-primary tracking-tight font-sans text-sm uppercase">
            PrivacyHub
          </span>
        </div>

        <button 
          onClick={onCancel}
          className="text-xs font-bold text-brand-muted hover:text-brand-primary uppercase tracking-wider cursor-pointer"
        >
          Cancel
        </button>
      </div>

      {/* Primary Scroll Container */}
      <div className="flex-1 px-6 py-6 space-y-6 pb-20">
        
        {/* Title */}
        <h2 className="text-2xl font-bold tracking-tight text-brand-primary font-sans">
          Create post
        </h2>

        {/* Mindful check alert block */}
        <div className="flex items-start space-x-3 p-4 bg-orange-50 border border-brand-orange/30 rounded-2xl">
          <Lightbulb className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-[11px] text-[#7c4d12] font-semibold leading-relaxed">
              Before sharing, check if your post contains private information about you or others (such as addresses, credentials, or phone numbers).
            </p>
          </div>
        </div>

        {/* Create Input block */}
        <div className="space-y-4">
          
          <div className="rounded-2xl border border-brand-outline-variant/40 bg-white p-4 space-y-3 shadow-xs">
            {/* Input textarea */}
            <textarea
              placeholder="What would you like to share?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full text-xs text-brand-dark bg-transparent border-none outline-hidden placeholder:text-brand-muted/40 font-medium resize-none focus:ring-0"
            />

            {/* Test Injection triggers button */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={insertTestPhoneNumber}
                className="text-[10px] bg-brand-surface-container hover:bg-brand-outline-variant/45 font-mono text-brand-muted px-2 py-1 rounded-sm cursor-pointer transition-colors"
                title="Inject standard trigger (+1-206-555-0199) to evaluate AI safeguard system pop-ups"
              >
                + Inject Sensitive Demo Phone
              </button>
            </div>

            {/* Attached Artwork Preview */}
            {selectedArtUrl && (
              <div className="relative rounded-xl border border-brand-outline-variant/30 overflow-hidden bg-brand-surface group">
                <img 
                  src={selectedArtUrl} 
                  alt="Draft post attachment" 
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedArtUrl(undefined)}
                  className="absolute top-2 right-2 bg-brand-primary/80 hover:bg-brand-primary text-white text-[10px] px-2 py-1.5 rounded-md font-bold transition-transform cursor-pointer scale-95"
                >
                  Clear Photo
                </button>
              </div>
            )}

            {/* Standard Add Photo placeholder container */}
            {!selectedArtUrl && (
              <button 
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className="w-full flex flex-col items-center justify-center space-y-2 py-8 rounded-xl border-2 border-dashed border-brand-outline-variant/60 hover:border-brand-primary transition-colors cursor-pointer bg-brand-surface/50 text-brand-muted hover:text-brand-primary"
              >
                <div className="w-10 h-10 rounded-full bg-brand-mint/40 flex items-center justify-center">
                  <Image className="w-5 h-5 text-brand-primary" />
                </div>
                <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                  Add photo
                </span>
                <span className="text-[10px] text-brand-muted/70 font-medium font-sans">
                  Choose preset premium minimal assets
                </span>
              </button>
            )}
          </div>

          {/* Minimal artwork preset expanding tray */}
          {showPresets && !selectedArtUrl && (
            <div className="p-4 rounded-xl border border-brand-outline-variant/30 bg-white shadow-sm space-y-3 animate-fadeIn">
              <span className="text-[10px] font-extrabold text-brand-primary uppercase tracking-widest">Select Premium Wave Art preset</span>
              <div className="grid grid-cols-2 gap-2">
                {MINIMALIST_ARTWORK_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => {
                      setSelectedArtUrl(p.url);
                      setShowPresets(false);
                    }}
                    className="relative group rounded-lg overflow-hidden h-20 border border-brand-outline-variant/40 hover:border-brand-primary transition-all cursor-pointer bg-brand-surface"
                  >
                    <img 
                      src={p.url} 
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 text-[9px] text-white p-1 font-bold text-center">
                      {p.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Settings Control Panel */}
        <div className="space-y-3">
          
          {/* Visibility Row card */}
          <div className="relative rounded-xl border border-brand-outline-variant/40 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-3">
                <Globe className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-brand-primary">
                    Who can see this?
                  </h4>
                  <p className="text-[11px] text-brand-muted font-medium">
                    Public, Friends, or Private.
                  </p>
                </div>
              </div>

              {/* Toggle click triggers popup list */}
              <button 
                type="button"
                onClick={() => setShowVisibilityMenu(!showVisibilityMenu)}
                className="px-3.5 py-1.5 rounded-lg bg-brand-surface-container hover:bg-brand-outline-variant/50 border border-brand-outline-variant/30 text-xs font-bold text-brand-primary cursor-pointer transition-colors"
              >
                {visibility}
              </button>
            </div>

            {/* Simulated mini visibility dropmenu list */}
            {showVisibilityMenu && (
              <div className="absolute right-4 top-13 bg-white border border-brand-outline-variant rounded-xl shadow-md p-2 z-20 space-y-1 animate-fadeIn w-36">
                {(["Public", "Friends only", "Private"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setVisibility(opt);
                      setShowVisibilityMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${visibility === opt ? 'bg-brand-mint text-brand-primary' : 'hover:bg-brand-surface-container'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Safety Scan custom switch */}
          <div className="rounded-xl border border-brand-outline-variant/40 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-xs font-bold text-brand-primary">
                    AI Safety Scan
                  </h4>
                  <p className="text-[11px] text-brand-muted font-medium">
                    Automatic PII detection
                  </p>
                </div>
              </div>

              {/* Custom switch control toggler */}
              <button 
                type="button"
                onClick={() => setAiSafetyScan(!aiSafetyScan)}
                className={`w-11 h-6 rounded-full transition-colors relative focus:outline-hidden cursor-pointer ${aiSafetyScan ? 'bg-brand-mint' : 'bg-brand-outline-variant'}`}
                aria-label="Toggle AI Safety scan on write post"
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform shadow-xs ${aiSafetyScan ? 'right-1' : 'left-1'}`}
                />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Post triggers Action Button */}
        <button
          onClick={handlePostSubmit}
          className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-brand-primary-container text-brand-mint font-bold text-xs uppercase tracking-wider hover:bg-brand-primary hover:text-white transition-all cursor-pointer shadow-md active:scale-98"
        >
          <Send className="w-4 h-4" />
          <span>Post Content</span>
        </button>

      </div>
    </div>
  );
}
