/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ShieldCheck, Settings, Lock, Grid, List, Shield, CheckCircle2, ChevronRight, Hash } from "lucide-react";
import { motion } from "motion/react";
import { User, Post, ScreenID } from "../types";

interface ProfileProps {
  user: User;
  posts: Post[];
  onNavigate: (screen: ScreenID) => void;
  onSelectProofPost: (postId: string) => void;
}

// 6 bespoke premium cryptographic mock images matching the profile view
const CRYPTO_GALLERY = [
  {
    id: "g_1",
    title: "Cryptographic Lock",
    url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&auto=format&fit=crop&q=80",
    postId: "post_1"
  },
  {
    id: "g_2",
    title: "Fiber Optics Network",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80",
    postId: "post_2"
  },
  {
    id: "g_3",
    title: "Minimal Block Device",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80",
    postId: "post_1"
  },
  {
    id: "g_4",
    title: "Decentralized Ledger",
    url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop&q=80",
    postId: "post_2"
  },
  {
    id: "g_5",
    title: "Digital Footprint",
    url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&auto=format&fit=crop&q=80", // cell dashboard
    postId: "post_1"
  },
  {
    id: "g_6",
    title: "Secure Vault Shield",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop&q=80",
    postId: "post_1"
  }
];

export default function Profile({ user, posts, onNavigate, onSelectProofPost }: ProfileProps) {
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid");

  const handleGalleryClick = (postId: string) => {
    onSelectProofPost(postId);
    onNavigate("ownership_proof");
  };

  return (
    <div 
      className="flex flex-col h-full bg-brand-surface overflow-y-auto"
      id="profile-screen"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-brand-outline-variant/30 sticky top-0 bg-brand-surface/90 backdrop-blur-md z-10">
        <span className="font-extrabold text-brand-primary tracking-tight font-sans text-base">
          PrivacyHub
        </span>
        
        <button 
          onClick={() => onNavigate("privacy_settings")}
          className="p-1.5 rounded-full hover:bg-brand-surface-container transition-colors text-brand-primary cursor-pointer animate-spin-hover"
          aria-label="Settings panel"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="px-6 py-6 space-y-6">
        
        {/* Profile Identity Details Card */}
        <div className="flex flex-col items-center text-center space-y-4">
          
          {/* Avatar holding rings */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-brand-secondary via-brand-mint to-brand-primary">
              <img 
                src={user.avatarUrl} 
                alt={user.displayName}
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>
            {/* Checked verification badge */}
            <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-brand-mint border-2 border-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-4.5 h-4.5 text-brand-primary" />
            </span>
          </div>

          {/* Name indicators */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-brand-primary font-sans leading-none">
              {user.displayName}
            </h2>
            
            <div className="flex items-center justify-center space-x-1.5 pt-1.5">
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-brand-mint/40 text-[10px] font-bold text-brand-primary tracking-wide">
                <span>Privacy-first profile</span>
              </span>
            </div>

            <p className="text-[11px] font-mono font-semibold text-brand-muted/70 pt-0.5">
              @{user.username}
            </p>
          </div>

          {/* Editorial bio */}
          <p className="text-xs text-brand-muted font-medium leading-relaxed max-w-[280px]">
            {user.bio}
          </p>

          {/* Action button leading to Settings */}
          <button 
            onClick={() => onNavigate("privacy_settings")}
            className="w-full max-w-[260px] flex items-center justify-center space-x-2 py-2.5 rounded-lg border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>Privacy & Consent Settings</span>
          </button>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* Posts */}
          <div className="p-4 rounded-xl border border-brand-outline-variant/40 bg-white shadow-xs text-center space-y-1">
            <p className="text-xl font-black text-brand-primary font-sans leading-none">
              {user.postsCount + posts.filter(p => !p.isSystemUpdate && p.authorUsername === user.username).length}
            </p>
            <p className="text-[9px] font-extrabold text-brand-muted uppercase tracking-widest">Posts</p>
          </div>

          {/* Connections */}
          <div className="p-4 rounded-xl border border-brand-outline-variant/40 bg-white shadow-xs text-center space-y-1">
            <p className="text-xl font-black text-brand-primary font-sans leading-none">
              {user.connectionsCount}
            </p>
            <p className="text-[9px] font-extrabold text-brand-muted uppercase tracking-widest">Connections</p>
          </div>

          {/* Trust Actions */}
          <div className="p-4 rounded-xl border border-brand-outline-variant/40 bg-white shadow-xs text-center space-y-1">
            <p className="text-xl font-black text-brand-primary font-sans leading-none">
              {user.trustActionsCount}
            </p>
            <p className="text-[9px] font-extrabold text-[#2c6956] uppercase tracking-widest">Trust Actions</p>
          </div>

          {/* Privacy score */}
          <div className="p-4 rounded-xl border border-brand-outline-variant/40 bg-white shadow-xs text-center space-y-1">
            <p className="text-xl font-black text-brand-secondary font-sans leading-none">
              {user.privacyScore}%
            </p>
            <p className="text-[9px] font-extrabold text-brand-muted uppercase tracking-widest">Privacy Score</p>
          </div>

        </div>

        {/* Gallery Segment tab header */}
        <div className="flex items-center justify-between border-t border-brand-outline-variant/20 pt-4">
          <h3 className="text-xs font-extrabold text-brand-primary uppercase tracking-wider">
            Recent Activity
          </h3>

          <div className="flex items-center space-x-1 border border-brand-outline-variant/40 rounded-lg p-0.5 bg-white shadow-2xs">
            <button
              onClick={() => setLayoutMode("grid")}
              className={`p-1 rounded-sm cursor-pointer ${layoutMode === "grid" ? "bg-brand-mint/45 text-brand-primary" : "text-brand-muted"}`}
              title="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutMode("list")}
              className={`p-1 rounded-sm cursor-pointer ${layoutMode === "list" ? "bg-brand-mint/45 text-brand-primary" : "text-brand-muted"}`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gallery list cards */}
        {layoutMode === "grid" ? (
          <div className="grid grid-cols-2 gap-2.5">
            {CRYPTO_GALLERY.map((g) => (
              <motion.div
                key={g.id}
                onClick={() => handleGalleryClick(g.postId)}
                className="relative group rounded-xl overflow-hidden border border-brand-outline-variant/40 cursor-pointer shadow-xs bg-white h-28"
                whileHover={{ scale: 1.01 }}
              >
                <img 
                  src={g.url} 
                  alt={g.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 duration-300 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-2 opacity-90">
                  <div className="text-center space-y-0.5">
                    <span className="block text-[8px] font-serif uppercase tracking-wider text-brand-mint font-bold">Proof Verified</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {CRYPTO_GALLERY.map((g) => (
              <div 
                key={g.id}
                onClick={() => handleGalleryClick(g.postId)}
                className="flex items-center justify-between p-3.5 rounded-xl border border-brand-outline-variant/40 bg-white hover:border-brand-primary cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img src={g.url} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                  <div>
                    <h5 className="text-[11px] font-bold text-brand-primary">{g.title}</h5>
                    <span className="text-[9px] font-mono text-brand-muted/70">IMMUTABLE BLOCK STAMP</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-muted" />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
