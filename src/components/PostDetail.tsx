/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowLeft, Send, Users, Globe, Lock, ShieldCheck, Heart, MessageSquare, BadgeCheck } from "lucide-react";
import { Post, Comment, ScreenID } from "../types";

interface PostDetailProps {
  onGoBack: () => void;
  post?: Post;
  onAddComment: (postId: string, commentContent: string) => void;
  onLikePost: (postId: string) => void;
  currentUsername: string;
  currentAvatarUrl: string;
  currentDisplayName: string;
}

export default function PostDetail({ 
  onGoBack, 
  post, 
  onAddComment, 
  onLikePost, 
  currentUsername, 
  currentAvatarUrl, 
  currentDisplayName 
}: PostDetailProps) {
  const [newComment, setNewComment] = useState("");

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-brand-surface p-6 text-center space-y-4">
        <p className="text-sm font-bold text-brand-primary">Selected post not found</p>
        <button onClick={onGoBack} className="text-xs text-brand-secondary underline font-extrabold cursor-pointer">
          Go back to Timeline
        </button>
      </div>
    );
  }

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddComment(post.id, newComment);
    setNewComment("");
  };

  return (
    <div 
      className="flex flex-col h-full bg-brand-surface"
      id="post-detail-screen"
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
          Post Details
        </span>
        <div className="w-7 shadow-xs font-serif" />
      </div>

      {/* Main timeline detail container scrollable */}
      <div className="flex-grow overflow-y-auto px-6 py-6 space-y-6">
        
        {/* Author Post Card Detail Header */}
        <div className="p-5 rounded-2xl border border-brand-outline-variant/40 bg-white shadow-xs space-y-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={post.authorAvatar} 
                alt={post.authorName} 
                className="w-11 h-11 rounded-full object-cover border border-brand-outline-variant"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center space-x-1">
                  <h4 className="text-xs font-extrabold text-brand-primary">
                    {post.authorName}
                  </h4>
                  {post.isVerifiedUser && (
                    <BadgeCheck className="w-3.5 h-3.5 text-brand-secondary fill-brand-mint/40" />
                  )}
                </div>
                <span className="text-[10px] text-brand-muted/70 font-semibold font-mono">
                  @{post.authorUsername} • {post.timestamp}
                </span>
              </div>
            </div>

            {/* Visibility label */}
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-brand-surface-container text-[10px] font-bold text-brand-muted">
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

          {/* Main Parent Post Text */}
          <p className="text-xs text-brand-primary font-medium leading-relaxed">
            {post.content}
          </p>

          {/* Featured attachment block if present */}
          {post.imageUrl && (
            <div className="rounded-xl border border-brand-outline-variant/30 overflow-hidden bg-brand-surface">
              <img 
                src={post.imageUrl} 
                alt="Shared design wave" 
                referrerPolicy="no-referrer"
                className="w-full object-cover max-h-[220px]"
              />
            </div>
          )}

          {/* Cryptographic SHA metadata band */}
          {post.assetHash && (
            <div className="p-3 bg-brand-surface rounded-xl border border-brand-outline-variant/30 space-y-1">
              <span className="text-[8px] font-mono font-bold tracking-widest text-brand-muted uppercase">LEDGER STATE ROOT RECORD</span>
              <code className="block text-[10px] font-mono font-bold text-brand-secondary overflow-hidden text-ellipsis whitespace-nowrap">
                {post.assetHash}
              </code>
            </div>
          )}

          {/* Heart toggle click item */}
          <div className="flex items-center space-x-3 pt-3 border-t border-brand-surface-container select-none text-xs font-bold text-brand-muted">
            <button 
              onClick={() => onLikePost(post.id)}
              className={`flex items-center space-x-2 py-1 px-3 rounded-lg hover:bg-red-50/50 cursor-pointer ${post.isLikedByUser ? 'text-red-500 font-extrabold' : ''}`}
            >
              <Heart className={`w-4 h-4 ${post.isLikedByUser ? 'fill-red-500 stroke-red-500' : ''}`} />
              <span>{post.likes} likes</span>
            </button>
            
            <div className="flex items-center space-x-2 py-1 px-3 text-brand-primary font-semibold">
              <MessageSquare className="w-4 h-4 text-brand-secondary" />
              <span>{post.comments.length} comments</span>
            </div>
          </div>

        </div>

        {/* Comments timeline divider */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-brand-primary uppercase tracking-wider pl-1">
            Comments ({post.comments.length})
          </h4>

          <div className="space-y-3.5">
            {post.comments.length === 0 ? (
              <p className="text-xs text-brand-muted italic pl-1 text-center py-4">No comments written yet. Be the first to start a conversation!</p>
            ) : (
              post.comments.map((comment) => (
                <div 
                  key={comment.id}
                  className="p-4 rounded-xl border border-brand-outline-variant/35 bg-white space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={comment.authorAvatar} 
                        alt={comment.authorName} 
                        className="w-8 h-8 rounded-full object-cover border border-brand-outline-variant"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h5 className="text-xs font-bold text-brand-primary">{comment.authorName}</h5>
                        <p className="text-[10px] text-brand-muted/70 font-semibold leading-none">@{comment.authorUsername}</p>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono text-brand-muted/80">{comment.timestamp}</span>
                  </div>

                  <p className="text-xs text-brand-muted font-medium pl-1 leading-relaxed">
                    {comment.content}
                  </p>

                  {/* Comment immutable record seal hash to represent on-ledger consent */}
                  <div className="text-right">
                    <span className="inline-flex items-center space-x-1 text-[8px] font-mono font-bold tracking-tight text-brand-secondary bg-brand-mint/20 px-2 py-0.5 rounded">
                      <ShieldCheck className="w-2.5 h-2.5 text-brand-secondary" />
                      <span>Seal #0x{comment.id.slice(0, 4)}</span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Write Comment footer overlay bar strictly within device bounds */}
      <form 
        onSubmit={handleSendComment}
        className="p-4 border-t border-brand-outline-variant/30 bg-white sticky bottom-0 z-10 flex items-center space-x-3 shadow-sm"
      >
        <img 
          src={currentAvatarUrl} 
          alt={currentDisplayName} 
          className="w-8 h-8 rounded-full object-cover border border-brand-outline-variant"
          referrerPolicy="no-referrer"
        />
        
        <input 
          type="text"
          placeholder="Write your comment securely..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-grow px-4 py-2.5 text-xs bg-brand-surface rounded-xl border border-brand-outline-variant/60 focus:outline-hidden focus:border-brand-primary text-brand-dark font-medium placeholder:text-brand-muted/60"
        />

        <button
          type="submit"
          className="w-9 h-9 flex items-center justify-center bg-brand-primary text-white hover:bg-brand-primary/90 rounded-full transition-colors cursor-pointer shadow-xs"
          title="Publish comment"
        >
          <Send className="w-4.5 h-4.5" />
        </button>
      </form>

    </div>
  );
}
