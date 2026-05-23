/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Shield, Search, Bell, Info, Heart, MessageSquare, Flag, CircleCheck, Globe, Users, Lock, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Post, ScreenID } from "../types";

interface HomeFeedProps {
  posts: Post[];
  onNavigate: (screen: ScreenID) => void;
  onSelectPost: (postId: string) => void;
  onLikePost: (postId: string) => void;
}

export default function HomeFeed({ posts, onNavigate, onSelectPost, onLikePost }: HomeFeedProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationMsg, setNotificationMsg] = useState("");

  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.authorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const triggerNotification = () => {
    setNotificationMsg("All system notifications are secured locally. No tracking pixels loaded.");
    setTimeout(() => setNotificationMsg(""), 4000);
  };

  const handleReport = (post: Post) => {
    alert(`Report filed for post from ${post.authorName}. Safeguarding logs generated and hashed locally: ${post.assetHash ? post.assetHash.slice(0, 8) : 'Pending'}`);
  };

  return (
    <div 
      className="flex flex-col h-full bg-brand-surface"
      id="home-feed-screen"
    >
      {/* Feed Top Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-brand-outline-variant/30 sticky top-0 bg-brand-surface/90 backdrop-blur-md z-15">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-brand-primary" strokeWidth={2.5} />
          <span className="font-extrabold text-brand-primary tracking-tight font-sans text-base">
            PrivacyHub
          </span>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setSearchOpen(!searchOpen)} 
            className="p-1.5 rounded-full hover:bg-brand-surface-container transition-colors cursor-pointer text-brand-primary"
            aria-label="Search posts"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button 
            onClick={triggerNotification}
            className="p-1.5 rounded-full hover:bg-brand-surface-container transition-colors cursor-pointer text-brand-primary relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange rounded-full" />
          </button>
        </div>
      </div>

      {/* Dynamic Search Expand */}
      {searchOpen && (
        <div className="px-6 py-3 bg-white border-b border-brand-outline-variant/30 animate-fadeIn">
          <input 
            type="text"
            placeholder="Search feed content or users securely..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-brand-surface rounded-lg border border-brand-outline-variant/40 focus:outline-hidden focus:border-brand-primary text-brand-dark"
            autoFocus
          />
        </div>
      )}

      {/* Ephemeral Bell notifications inside app */}
      {notificationMsg && (
        <div className="mx-6 mt-3 p-2.5 rounded-lg bg-brand-primary text-brand-mint text-[11px] font-bold tracking-wide text-center uppercase animate-bounce">
          {notificationMsg}
        </div>
      )}

      {/* Main Feed Scrolling Window */}
      <div className="flex-grow overflow-y-auto px-6 py-4 space-y-6">
        
        {/* Anti-Algorithm informational banner */}
        <div className="flex items-start space-x-3 p-4 rounded-xl border border-brand-outline-variant/40 bg-brand-surface-container/60">
          <Info className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
          <p className="text-xs text-brand-muted font-medium leading-relaxed">
            Simple timeline. No hidden ranking, search pixels, or telemetry logs.
          </p>
        </div>

        {/* Timeline Posts */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <p className="text-sm font-bold text-brand-primary">No posts matched search</p>
              <p className="text-xs text-brand-muted">Try looking for general text in your local feed.</p>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const isSys = post.isSystemUpdate;
              
              if (isSys) {
                return (
                  <motion.div 
                    key={post.id}
                    className="p-5 rounded-2xl border-2 border-brand-primary bg-white shadow-xs space-y-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center font-bold text-white text-xs">
                        PH
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-brand-primary tracking-wide uppercase">
                          {post.authorName}
                        </h4>
                        <span className="text-[10px] font-mono font-bold tracking-wider text-brand-orange uppercase">
                          {post.timestamp}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-brand-surface-container/40 rounded-xl border border-brand-outline-variant/30 text-brand-primary font-medium text-xs leading-relaxed">
                      {post.content}
                    </div>

                    {/* Authenticated indicators */}
                    <div className="flex items-center justify-between pt-2 border-t border-brand-outline-variant/20">
                      <div className="flex items-center space-x-1.5 text-xs text-brand-secondary font-bold">
                        <CircleCheck className="w-4 h-4 text-brand-secondary" />
                        <span>Secured</span>
                      </div>

                      <button 
                        onClick={() => {
                          onSelectPost(post.id);
                          onNavigate("post_detail");
                        }}
                        className="flex items-center space-x-1 text-xs text-brand-primary font-bold hover:underline cursor-pointer"
                      >
                        <span>Read More</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              }

              // Standard User Post card
              return (
                <motion.div 
                  key={post.id}
                  className="p-5 rounded-2xl border border-brand-outline-variant/40 bg-white shadow-xs space-y-4 hover:border-brand-outline transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Author Header Row */}
                  <div className="flex items-center justify-between">
                    <div 
                      className="flex items-center space-x-3 cursor-pointer"
                      onClick={() => onNavigate("profile")}
                    >
                      <img 
                        src={post.authorAvatar} 
                        alt={post.authorName}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-brand-outline-variant"
                      />
                      <div>
                        <div className="flex items-center space-x-1">
                          <h4 className="text-xs font-bold text-brand-primary">
                            {post.authorName}
                          </h4>
                          {post.isVerifiedUser && (
                            <CircleCheck className="w-3.5 h-3.5 text-brand-secondary fill-brand-mint/40" />
                          )}
                        </div>
                        <span className="text-[10px] text-brand-muted/70 font-bold">
                          @{post.authorUsername} • {post.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Visibility Badge */}
                    <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-brand-surface-container/70 text-[10px] font-bold text-brand-muted">
                      {post.visibility === "Public" ? (
                        <>
                          <Globe className="w-3 h-3 text-brand-secondary" />
                          <span>Public</span>
                        </>
                      ) : post.visibility === "Friends only" ? (
                        <>
                          <Users className="w-3 h-3 text-brand-secondary" />
                          <span>Friends Only</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3 h-3 text-brand-secondary" />
                          <span>Private</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-xs text-brand-muted font-medium leading-relaxed">
                    {post.content}
                  </p>

                  {/* Attached image if any */}
                  {post.imageUrl && (
                    <div 
                      onClick={() => {
                        onSelectPost(post.id);
                        onNavigate("post_detail");
                      }}
                      className="rounded-xl border border-brand-outline-variant/30 overflow-hidden cursor-pointer bg-brand-surface max-h-[220px]"
                    >
                      <img 
                        src={post.imageUrl} 
                        alt="Shared content visual asset"
                        referrerPolicy="no-referrer"
                        className="w-full max-h-[220px] object-cover hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Interactivity Actions footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-brand-outline-variant/20 text-xs font-bold text-brand-muted">
                    
                    {/* Live Likes counter toggle */}
                    <button 
                      onClick={() => onLikePost(post.id)}
                      className={`flex items-center space-x-2 py-1 px-3 rounded-lg hover:bg-red-50/50 transition-colors cursor-pointer ${post.isLikedByUser ? 'text-red-500 font-extrabold' : 'hover:text-red-500'}`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLikedByUser ? 'fill-red-500 stroke-red-500' : ''}`} />
                      <span>{post.likes}</span>
                    </button>

                    {/* Comment click routing to detailed conversation */}
                    <button 
                      onClick={() => {
                        onSelectPost(post.id);
                        onNavigate("post_detail");
                      }}
                      className="flex items-center space-x-2 py-1 px-3 rounded-lg hover:bg-brand-surface-container transition-colors cursor-pointer hover:text-brand-primary"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments.length}</span>
                    </button>

                    {/* Report Trigger */}
                    <button 
                      onClick={() => handleReport(post)}
                      className="flex items-center space-x-2 py-1 px-3 rounded-lg hover:bg-orange-50/60 transition-colors cursor-pointer hover:text-brand-orange"
                    >
                      <Flag className="w-4 h-4" />
                      <span>Report</span>
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
