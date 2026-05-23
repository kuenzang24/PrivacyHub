/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Users, Edit3, ShieldAlert, Info } from "lucide-react";
import { motion } from "motion/react";

interface AIWarningModalProps {
  onClose: () => void;
  onConfirmFriendsOnly: () => void;
  onEditPost: () => void;
  onPostAnyway: () => void;
}

export default function AIWarningModal({ 
  onClose, 
  onConfirmFriendsOnly, 
  onEditPost, 
  onPostAnyway 
}: AIWarningModalProps) {
  return (
    <div 
      className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs"
      id="ai-warning-modal"
    >
      {/* Background click to dismiss defaults to editing draft */}
      <div className="absolute inset-0" onClick={onEditPost} />

      {/* Warning Modal bottom sheet */}
      <motion.div 
        className="relative w-full bg-brand-surface rounded-t-[24px] border-t border-brand-outline-variant p-6 space-y-6 z-10 select-none pb-8 max-h-[90%] overflow-y-auto"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
      >
        
        {/* Horizontal grabber bar for mobile-first bottom sheets */}
        <div className="mx-auto w-12 h-1 bg-brand-outline-variant/60 rounded-full" />

        {/* Header containing warning circle indicator and text details */}
        <div className="flex items-start space-x-4 pt-2">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-50 border border-brand-orange text-brand-orange flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 animate-pulse" strokeWidth={1.5} />
          </div>

          <div className="space-y-1.5 flex-grow">
            <h3 className="text-lg font-bold text-brand-primary leading-tight font-sans">
              Sensitive information detected
            </h3>
            <p className="text-xs text-brand-muted font-medium leading-relaxed">
              Your post may contain a <span className="font-extrabold text-brand-primary underline">phone number</span>. You are sharing this publicly on your feed.
            </p>
          </div>
        </div>

        {/* Warning diagnostic card */}
        <div className="flex items-start space-x-3 p-4 bg-brand-surface-container/60 border border-brand-outline-variant/30 rounded-xl">
          <Info className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
          <p className="text-xs text-brand-muted font-medium leading-relaxed">
            AI agent scanned and detected a sequence that matches contact formats (e.g. phone/address layout). Adjusting permissions reduces accidental public exposure.
          </p>
        </div>

        {/* Action Buttons Stack */}
        <div className="space-y-3 pt-2">
          
          {/* Action 1: Change to Friends Only (Safe route) */}
          <button
            onClick={onConfirmFriendsOnly}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-brand-primary-container text-brand-mint font-bold text-xs uppercase tracking-wider hover:bg-brand-primary hover:text-white transition-all cursor-pointer shadow-md"
          >
            <Users className="w-4 h-4" />
            <span>Change to Friends Only</span>
          </button>

          {/* Action 2: Go back and edit text */}
          <button
            onClick={onEditPost}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-white border border-brand-outline-variant hover:border-brand-primary text-brand-primary font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Post</span>
          </button>

          {/* Action 3: Take risk line and force submit */}
          <button
            onClick={onPostAnyway}
            className="w-full py-2.5 text-center text-xs font-bold text-brand-muted hover:text-brand-orange transition-colors cursor-pointer block"
          >
            Post Anyway
          </button>

        </div>

      </motion.div>
    </div>
  );
}
