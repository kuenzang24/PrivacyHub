/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Shield, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

interface SplashProps {
  onComplete: () => void;
}

export default function Splash({ onComplete }: SplashProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300); // Small pause for aesthetic transition
          return 100;
        }
        return prev + 4;
      });
    }, 55);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className="flex flex-col items-center justify-between h-full bg-brand-surface p-8 select-none"
      id="splash-screen"
    >
      {/* Top Spacer */}
      <div />

      {/* Brand logo & tagline */}
      <motion.div 
        className="flex flex-col items-center text-center space-y-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full border border-brand-outline-variant bg-white shadow-xs">
          {/* Decorative ripples */}
          <div className="absolute inset-0 rounded-full border border-brand-mint animate-ping opacity-25" />
          <div className="absolute -inset-2 rounded-full border border-brand-outline-variant/30" />
          
          <div className="relative flex items-center justify-center">
            <Shield className="w-10 h-10 text-brand-primary" strokeWidth={1.5} />
            <MessageSquare className="w-5 h-5 text-brand-secondary absolute -right-1 bottom-0 bg-white rounded p-0.5 border border-brand-outline-variant" strokeWidth={2} />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-brand-primary font-sans">
            PrivacyHub
          </h1>
          <p className="text-brand-muted text-sm font-medium tracking-wide">
            Share freely. Stay in control.
          </p>
        </div>
      </motion.div>

      {/* Securing environment loading animation */}
      <motion.div 
        className="flex flex-col items-center w-full max-w-[260px] space-y-4 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brand-muted/70">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
          </span>
          <span>Securing Environment</span>
        </div>

        <div className="w-full h-1 bg-brand-surface-container rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-secondary transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <span className="text-[11px] font-mono font-medium text-brand-muted/70">
          {progress}% verified
        </span>
      </motion.div>
    </div>
  );
}
